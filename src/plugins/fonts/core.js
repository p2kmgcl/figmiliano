import { mountCore } from '../../common/mount-core';
import { sendMessageToUI } from '../../common/messages-core';
import { addListener } from '../../common/messages-common';

const page = figma.currentPage;
const loadedFonts = new Set();

let baseSize = 12;
let ratio = 1;
let fontName = { family: 'Roboto', style: 'Regular' };
let sample = '';
let spacing = 0;
let textNodes = [];
let steps = 0;

const createTextNodes = () => {
  textNodes = textNodes.filter((textNode) => !textNode.removed);

  if (steps < textNodes.length) {
    textNodes.splice(steps, textNodes.length - steps).forEach((textNode) => {
      textNode.remove();
    });
  } else if (steps > textNodes.length) {
    for (let i = textNodes.length; i < steps; i++) {
      const textNode = figma.createText();
      textNode.fontName = fontName;
      textNode.characters = sample;
      page.appendChild(textNode);
      textNodes.push(textNode);
    }

    updateTextNodesFontSizes();
    updateTextNodesPositions();
  }

  if (textNodes.length) {
    page.selection = textNodes;
    const group = figma.group(textNodes, page);
    group.name = `${fontName.family} ${fontName.style} (${sample})`;
    figma.viewport.scrollAndZoomIntoView(textNodes);
  }
};

const updateTextNodesPositions = () => {
  let accPosition = 0;

  textNodes.forEach((textNode) => {
    textNode.x = 0;
    textNode.y = accPosition;
    accPosition = accPosition + textNode.height + spacing;
  });
};

const updateTextNodesFontSizes = () => {
  textNodes.forEach((textNode, index) => {
    textNode.fontSize = Math.ceil(baseSize * Math.pow(ratio, index));
    textNode.name = `x${Math.pow(ratio, index).toFixed(2)} ≈ ${
      textNode.fontSize
    }px`;
  });
};

const main = () => {
  addListener('fontList', () => {
    figma.listAvailableFontsAsync().then((fontList) => {
      sendMessageToUI('fontList', fontList);
    });
  });

  addListener('baseSize', (newBaseSize) => {
    baseSize = newBaseSize;

    createTextNodes();
    updateTextNodesFontSizes();
    updateTextNodesPositions();
  });

  addListener('ratio', (newRatio) => {
    ratio = newRatio;

    createTextNodes();
    updateTextNodesFontSizes();
    updateTextNodesPositions();
  });

  addListener('spacing', (newSpacing) => {
    spacing = newSpacing;

    createTextNodes();
    updateTextNodesPositions();
  });

  addListener('steps', (newSteps) => {
    steps = newSteps;
    createTextNodes();
  });

  addListener('sample', (newSample) => {
    sample = newSample;

    textNodes.forEach((textNode) => {
      textNode.characters = sample;
    });

    createTextNodes();
    updateTextNodesPositions();
  });

  addListener('fontName', (newFontName) => {
    fontName = newFontName;

    figma.loadFontAsync(newFontName).then(() => {
      loadedFonts.add(newFontName);

      if (loadedFonts.has(fontName)) {
        textNodes.forEach((textNode) => {
          textNode.fontName = fontName;
        });

        createTextNodes();
        updateTextNodesPositions();
      }
    });
  });
};

figma.loadFontAsync(fontName).then(() =>
  mountCore(
    () => {
      main();
    },
    { width: 350, height: 250 },
  ),
);
