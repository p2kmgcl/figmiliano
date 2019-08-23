let listeners = {};

/**
 * Returns a Set of listener for the given type.
 * Creates a new Set if it does not exist.
 * @param {string} type
 * @return {Set}
 */
const getListeners = (type) => {
  if (!(type in listeners)) {
    listeners[type] = new Set();
  }

  return listeners[type];
};

/**
 * Sends a message to existing listeners
 * @param {object} message
 * @param {string} message.type
 * @param {any} message.payload
 */
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

/**
 * @param {string} type
 * @param {(payload: any) => void} callback
 */
export const addListener = (type, callback) => {
  getListeners(type).add(callback);
};

/**
 * @param {string} type
 * @param {(payload: any) => void} callback
 */
export const removeListener = (type, callback) => {
  getListeners(type).delete(callback);
};
