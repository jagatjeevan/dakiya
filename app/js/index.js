// Framework imports
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

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

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        {routes}
      </Provider>
    );
  }
}

function run() {
  i18N.initiateTranslator(start);
}

function start() {
  ReactDom.render(<App />, document.getElementById('content'));
}

window.addEventListener('DOMContentLoaded', run);
