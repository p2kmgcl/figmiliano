import { addCoreMessageListener, sendMessageToUI } from '../messages-core';

describe('common/messages-core', () => {
  describe('addCoreMessageListener', () => {
    beforeEach(() => {
      global.figma = {
        ui: {},
      };
    });

    it('sets figma.ui.message to a callback', () => {
      expect(figma.ui.onmessage).toBeUndefined();
      addCoreMessageListener();
      expect(typeof figma.ui.onmessage).toBe('function');
    });
  });

  describe('sendMessageToUI', () => {
    beforeEach(() => {
      global.figma = {
        ui: {
          postMessage: jest.fn(),
        },
      };
    });

    it('calls figma.ui.postMessage with given type and payload', () => {
      sendMessageToUI('type', 'payload');

      expect(global.figma.ui.postMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'payload',
      });
    });

    it('has a default null payload', () => {
      sendMessageToUI('type');

      expect(global.figma.ui.postMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: null,
      });
    });
  });
});
