import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
// import { routerMiddleware } from 'connected-react-router';
// import createHistory from 'history/createBrowserHistory';
// import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<any, any, any, any>(rootReducer, composeEnhancer(applyMiddleware(ReduxThunk)));

export default store;
