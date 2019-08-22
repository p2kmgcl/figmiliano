import { addCoreMessageListener } from './messages-core';

export const mountCore = (callback, options = {}) => {
  addCoreMessageListener();
  figma.showUI(__html__, options);
  callback();
};
