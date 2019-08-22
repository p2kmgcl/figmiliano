import { addCoreMessageListener } from './messages-core';

export const mountCore = (callback) => {
  addCoreMessageListener();
  figma.showUI(__html__);
  callback();
};
