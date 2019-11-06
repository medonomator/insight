import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getToken } from './helpers/token';
import setAuthorizationToken from './helpers/setAuthorizationToken';
import App from './App.tsx';
import LoginPage from './Pages/LoginPage';
import './assets/global.module.sass';

if (getToken()) {
  setAuthorizationToken(getToken());
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/admin" render={({ history }) => (!getToken() ? history.push('login') : <App />)} />
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
