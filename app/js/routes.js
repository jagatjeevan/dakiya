// Frameworks
import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

// Configs
import appConfig from './appConfig';

// Components for the Router
import App from './pages/App';
import ListParcel from './components/ListParcel';
import AddParcel from './components/AddParcelPage';

export default (
  <Router history={hashHistory}>
    <Route path={appConfig.homePage} component={App}>
      <IndexRoute component={ListParcel} />
    </Route>
    <Route path={appConfig.addParcelPage} component={AddParcel} />
  </Router>
);
