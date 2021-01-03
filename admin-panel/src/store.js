import { createBrowserHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import ReduxThunk from 'redux-thunk'
import createRootReducer from './redux'

export const history = createBrowserHistory()

export default function configStore(preloadedState) {
  return configureStore({
    reducer: createRootReducer(history),
    middleware: [routerMiddleware(history), ReduxThunk],
    preloadedState,
    devTools: true,
  })
}
