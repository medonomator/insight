import { API } from '../../helpers/axios'
import { CHANGE_MATERIAL, SHOW_NOTIFICATION } from '../../redux/constants'

export const changeMaterial = () => async (dispatch) => {
  try {
    const res = await API('PUT', 'v1/admin/materials')
    dispatch({ type: CHANGE_MATERIAL, payload: res.data.data })
    return res
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        type: 'ERROR',
        message: error.message,
      },
    })
  }
}

export const deleteMaterial = () => async (dispatch) => {
  try {
    const res = await API('DELETE', 'v1/admin/materials')
    dispatch({ type: CHANGE_MATERIAL, payload: res.data.data })
    return res
  } catch (error) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        type: 'ERROR',
        message: error.message,
      },
    })
  }
}
