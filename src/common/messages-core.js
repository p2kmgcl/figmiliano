import { handleMessage } from './messages-common';

export const addCoreMessageListener = () => {
  figma.ui.onmessage = (message) => {
    handleMessage(message);
  };
};

export const sendMessageToUI = (type, payload = null) => {
  figma.ui.postMessage({
    type,
    payload,
  });
};
