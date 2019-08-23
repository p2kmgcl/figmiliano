jest.mock('react', () => {
  return {
    useState: (value) => [value, () => {}],
    useEffect: (callback) => callback(),
  };
});

import {
  addUIMessageListener,
  sendMessageToCore,
  useMessage,
} from '../messages-ui';

describe('common/messages-ui', () => {
  describe('addUIMessageListener', () => {
    it('sets window.onmessage to a callback', () => {
      expect(window.onmessage).toBeNull();
      addUIMessageListener();
      expect(typeof window.onmessage).toBe('function');
    });
  });

  describe('sendMessageToUI', () => {
    beforeEach(() => {
      global.window.parent.postMessage = jest.fn();
    });

    it('calls window.parent.postMessage with given type and payload', () => {
      sendMessageToCore('type', 'payload');

      expect(window.parent.postMessage).toHaveBeenCalledWith(
        {
          pluginMessage: {
            type: 'type',
            payload: 'payload',
          },
        },
        '*',
      );
    });

    it('has a default null payload', () => {
      sendMessageToCore('type');

      expect(window.parent.postMessage).toHaveBeenCalledWith(
        {
          pluginMessage: {
            type: 'type',
            payload: null,
          },
        },
        '*',
      );
    });
  });

  test.todo('useMessage');
});
