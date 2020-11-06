import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from '../constants'

const initialState = {
  isOpen: false,
  data: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        isOpen: true,
        data: action.payload,
      }
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        isOpen: false,
        data: {},
      }
    default:
      return state
  }
}
