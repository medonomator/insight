import { combineReducers } from 'redux'
import notification from './reducers/notification'
import materials from './reducers/materials'

export default combineReducers({
  notification,
  materials,
})
