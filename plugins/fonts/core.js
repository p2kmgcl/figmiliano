import { mountCore } from '../../common/mount-core';
import { sendMessageToUI } from '../../common/messages-core';
import { addListener } from '../../common/messages-common';

const loadedFonts = new Set();
let textNodes = [];

const loadFont = (fontName) => {
  const fontId = JSON.stringify(fontName);

  if (!loadedFonts.has(fontId)) {
    loadedFonts.add(fontId);
    return figma.loadFontAsync(fontName);
  }

  return Promise.resolve();
};

const getTextNode = (fontName, fontSize, characters) => {
  const textNode = figma.createText();

  textNode.fontName = fontName;
  textNode.fontSize = fontSize;
  textNode.characters = characters;

  return textNode;
};

const render = (data) => {
  textNodes
    .filter((textNode) => !textNode.removed)
    .forEach((textNode) => textNode.remove());

  let position = 0;
  textNodes = [];

  for (let i = 0; i < data.steps; i++) {
    const textNode = getTextNode(
      data.fontName,
      data.baseSize * Math.pow(data.ratio, i),
      data.sample,
    );

    textNode.y = position;
    position += textNode.height + data.spacing;

    figma.currentPage.appendChild(textNode);
    textNodes.push(textNode);
  }

  figma.group(textNodes, figma.currentPage);
  figma.currentPage.selection = textNodes;
  figma.viewport.scrollAndZoomIntoView(textNodes);
};

mountCore(() => {
  addListener('font-list', () => {
    figma.listAvailableFontsAsync().then((fontList) => {
      sendMessageToUI('font-list', fontList);
    });
  });

  addListener('render', (data) => {
    loadFont(data.fontName).then(() => render(data));
  });
});
