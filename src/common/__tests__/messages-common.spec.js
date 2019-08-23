import { addListener, handleMessage, removeListener } from '../messages-common';

describe('common/messages-common', () => {
  it('adds listeners for a given message type', () => {
    const listener = jest.fn();
    const message = { type: 'type', payload: 'payload' };

    addListener(message.type, listener);
    handleMessage(message);

    expect(listener).toHaveBeenCalledWith(message.payload);
  });

  it('does not call listener for wrong types', () => {
    const listener = jest.fn();
    const wrongMessage = { type: 'notype', payload: 'unpayload' };

    addListener('type', listener);
    handleMessage(wrongMessage);

    expect(listener).not.toHaveBeenCalled();
  });

  it('allows removing listeners', () => {
    const listener = jest.fn();
    const message = { type: 'type', payload: 'payload' };

    addListener(message.type, listener);
    removeListener(message.type, listener);
    handleMessage(message);

    expect(listener).not.toHaveBeenCalled();
  });

  it('requires a given payload in messages', () => {
    const listener = jest.fn();
    const message = { type: 'type' };

    addListener(message.type, listener);
    handleMessage(message);

    expect(listener).not.toHaveBeenCalled();
  });
});
