// Frameworks
import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

// Configs
import AppConfig from './appConfig';

// Components for the Router
import App from './pages/App';
import ListParcel from './components/ListParcel';
import AddParcel from './components/AddParcelPage';

export default (
  <Router history={browserHistory}>
    <Route path={AppConfig.basePath} component={App}>
      <IndexRoute component={ListParcel} />
    </Route>
    <Route path={AppConfig.addParcelPage} component={AddParcel} />
  </Router>
);
