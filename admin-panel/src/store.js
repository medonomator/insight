import { createBrowserHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import createRootReducer from './redux'
import rootSaga from './sagas'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

export default function configStore(preloadedState) {
  const middleware = [routerMiddleware(history), ReduxThunk, sagaMiddleware]

  // if (process.env.NODE_ENV === `development`) {
  //   middleware.push(logger)
  // }

  const store = configureStore({
    reducer: createRootReducer(history),
    middleware,
    preloadedState,
    devTools: true,
  })

  sagaMiddleware.run(rootSaga)

  // const action = (type) => store.dispatch(type)
  // action({ type: 'INCREMENT_ASYNC' });

  return store
}
