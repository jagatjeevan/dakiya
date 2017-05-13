// Framework imports
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

// Translator
import i18N from './util/i18n';
import * as language from './util/language';

// Routes
import routes from './routes';
import { configureStore } from './reduxStore';

// Scss
import '../scss/styles.scss';

const store = configureStore();
language.getLanguage();

export const App = () => (
  <Provider store={store}>
    {routes}
  </Provider>
  );

function start() {
  ReactDom.render(<App />, document.getElementById('content'));
}

function run() {
  i18N.initiateTranslator(start);
}

window.addEventListener('DOMContentLoaded', run);

export default App;
