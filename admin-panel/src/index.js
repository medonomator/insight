import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './components/app'
import Login from './components/login'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/admin/login" component={Login} />
        <Route path="/admin" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  target
)
