import { CLOSE_NOTIFICATION } from '../../redux/constants'

export const closeNotification = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_NOTIFICATION, payload: {} })
  }
}
