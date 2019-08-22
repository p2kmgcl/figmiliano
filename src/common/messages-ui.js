import { handleMessage, removeListener, addListener } from './messages-common';
import { useEffect, useState } from 'react';

export const addUIMessageListener = () => {
  window.onmessage = (event) => {
    if (event.data) {
      handleMessage(event.data.pluginMessage);
    }
  };
};

export const sendMessageToCore = (type, payload = null) => {
  window.parent.postMessage(
    {
      pluginMessage: {
        type,
        payload,
      },
    },
    '*',
  );
};

export const useMessage = (type, payload, defaultValue) => {
  const [message, setMessage] = useState(defaultValue);

  useEffect(() => {
    const handleMessage = (newMessage) => {
      setMessage(newMessage);
    };

    addListener(type, handleMessage);
    sendMessageToCore(type, payload);

    return () => {
      removeListener(type, handleMessage);
    };
  }, [type, setMessage]);

  return message;
};
