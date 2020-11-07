import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import notification from './reducers/notification'
import materials from './reducers/materials'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    notification,
    materials,
  })
export default createRootReducer
