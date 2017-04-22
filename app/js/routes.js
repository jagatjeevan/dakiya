// Frameworks
import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

// Configs
import AppConfig from './appConfig';

// Components for the Router
import App from './pages/App';
import ListParcel from './components/ListParcel';
// import AddParcel from './components/AddParcel';

export default (
  <Router history={hashHistory}>
    <Route path={AppConfig.basePath} component={App}>
      <IndexRoute component={ListParcel} />
    </Route>
  </Router>
);


//       <Route path={AppConfig.addParcel} component={AddParcel} />
