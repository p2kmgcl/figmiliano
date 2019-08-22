import React from 'react';
import ReactDOM from 'react-dom';
import { addUIMessageListener } from './messages-ui';

export const mountUI = (Component) => {
  const main = document.createElement('main');
  main.style.fontFamily = 'Inter, Roboto, sans-serif';
  main.style.fontSize = '11px';

  addUIMessageListener();
  document.body.appendChild(main);

  ReactDOM.render(<Component />, main);
};
