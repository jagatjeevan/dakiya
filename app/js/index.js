import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Store
import { configureStore } from './reduxStore';

// Containers
import Full from './containers/Full/';

// Views
import Login from './views/Pages/Login/';
import Register from './views/Pages/Register/';
import Page404 from './views/Pages/Page404/';
import Page500 from './views/Pages/Page500/';

// Styles
import '../scss/style.scss';

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login} />
        <Route exact path="/register" name="Register Page" component={Register} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <Route path="/" name="Home" component={Full} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
