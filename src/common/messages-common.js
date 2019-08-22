const listeners = {};

const getListeners = (type) => {
  if (!(type in listeners)) {
    listeners[type] = new Set();
  }

  return listeners[type];
};

export const handleMessage = (message) => {
  if (
    message &&
    typeof message === 'object' &&
    typeof message.type === 'string' &&
    'payload' in message
  ) {
    getListeners(message.type).forEach((listener) => {
      listener(message.payload);
    });
  }
};

export const addListener = (type, callback) => {
  getListeners(type).add(callback);
};

export const removeListener = (type, callback) => {
  getListeners(type).delete(callback);
};
