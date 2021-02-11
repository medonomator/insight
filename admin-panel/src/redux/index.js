import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import notification from './reducers/notification'
import materials from './reducers/materials'
import aphorisms from './reducers/aphorisms'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    notification,
    materials,
    aphorisms,
  })

export default createRootReducer
