import { mountCore } from '../../common/mount-core';
import { sendMessageToUI } from '../../common/messages-core';
import { addListener } from '../../common/messages-common';

const data = {};
let textNodes = [];

const addDataListener = (name) => {
  data[name] = null;

  addListener(name, (newData) => {
    data[name] = newData;

    if (!Object.values(data).some((value) => value === null)) {
      figma.loadFontAsync(data.fontName).then(render);
    }
  });
};

const render = () => {
  textNodes
    .filter((textNode) => !textNode.removed)
    .forEach((textNode) => textNode.remove());

  let position = 0;
  textNodes = [];

  for (let i = 0; i < data.steps; i++) {
    const textNode = figma.createText();

    textNode.fontName = data.fontName;
    textNode.fontSize = data.baseSize * Math.pow(data.ratio, i);
    textNode.characters = data.sample;

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

  addDataListener('sample');
  addDataListener('baseSize');
  addDataListener('steps');
  addDataListener('spacing');
  addDataListener('fontName');
  addDataListener('ratio');
});
