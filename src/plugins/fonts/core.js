import { mountCore } from '../../common/mount-core';
import { sendMessageToUI } from '../../common/messages-core';
import { addListener } from '../../common/messages-common';

const page = figma.currentPage;
const loadedFonts = new Set();

let baseSize = 16;
let ratio = 1;
let fontName = { family: 'Roboto', style: 'Regular' };
let sample = '';
let spacing = 0;
let textNodes = [];
let decreaseSteps = 0;
let increaseSteps = 0;

const createTextNodes = () => {
  const steps = decreaseSteps + increaseSteps + 1;

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

  [...textNodes].reverse().forEach((textNode) => {
    textNode.x = 0;
    textNode.y = accPosition;
    accPosition = accPosition + textNode.height + spacing;
  });
};

const updateTextNodesFontSizes = () => {
  let currentRatio = decreaseSteps ? 1 / Math.pow(ratio, decreaseSteps) : 1;

  textNodes.forEach((textNode, index) => {
    const fontRatio = currentRatio;
    const fontSize = baseSize * fontRatio;

    textNode.fontSize = fontSize;
    textNode.name = `x${fontRatio.toFixed(2)} ≈ ${fontSize.toFixed(2)}px`;

    currentRatio *= ratio;
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

  addListener('decreaseSteps', (newSteps) => {
    decreaseSteps = newSteps;
    createTextNodes();
    updateTextNodesFontSizes();
  });

  addListener('increaseSteps', (newSteps) => {
    increaseSteps = newSteps;
    createTextNodes();
    updateTextNodesFontSizes();
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
    { width: 350, height: 280 },
  ),
);
