import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getToken } from './helpers/token';
import setAuthorizationToken from './helpers/setAuthorizationToken';
import App from './App';
import LoginPage from './components/LoginPage';
import store from './store';
import './assets/global.module.sass';

if (getToken()) {
  setAuthorizationToken(getToken());
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/admin/login" component={LoginPage} />
        <Route path="/admin" render={({ history }: any) => (!getToken() ? history.push('login') : <App />)} />
        <Redirect from="/" to="/admin" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// Hot reloading
if (module.hot) {
  module.hot.accept();
}
