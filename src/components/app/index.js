import React from 'react';
import { render } from 'react-dom';
import RedBox from 'redbox-react';

import App from './app';
import './index.css';

const appEl = document.querySelector('.app-root');
const rootEl = document.createElement('div');

let renderApp = () => {
  render(
    <App />,
    rootEl
  );
};

/* Hot Replacement support, won't be bundled to production */
/* eslint-disable modules/no-exports-typo */
if (module.hot) {
  const renderAppHot = renderApp;
  const renderError = error => {
    render(
      <RedBox error={error} />,
      rootEl
    );
  };

  renderApp = () => {
    try {
      renderAppHot();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./app', () => {
    setTimeout(renderApp);
  });
}

renderApp();
appEl.appendChild(rootEl);