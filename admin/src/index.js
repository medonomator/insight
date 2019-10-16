import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getToken } from './helpers/token';
import App from './App';
import LoginPage from './components/LoginPage';
import './assets/global.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/admin" render={({ history }) => (!getToken() ? history.push('login') : <App />)} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
