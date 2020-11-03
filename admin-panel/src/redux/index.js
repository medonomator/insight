import { combineReducers } from 'redux'
import counter from './reducers/counter'
import materials from './reducers/materials'

export default combineReducers({
  counter,
  materials
})
