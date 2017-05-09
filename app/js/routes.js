// Frameworks
import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

// Configs
import urls from './urls';

// Components for the Router
import App from './pages/App';
import ListParcel from './components/ListParcel';
import AddParcel from './components/AddParcelPage';

export default (
  <Router history={browserHistory}>
    <Route path={urls.homePage} component={App}>
      <IndexRoute component={ListParcel} />
    </Route>
    <Route path={urls.addParcelPage} component={AddParcel} />
  </Router>
);
