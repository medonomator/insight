import { API } from '../../helpers/axios'
import {
  CHANGE_MATERIAL,
  SHOW_NOTIFICATION,
  ADD_MATERIAL,
  DELETE_MATERIAL,
} from '../../redux/constants'
import { getMaterials } from '../../fetch'

export const changeMaterial = (material) => async (dispatch) => {
  try {
    const res = await API('PUT', 'v1/admin/materials', material)
    dispatch({ type: CHANGE_MATERIAL, payload: res.data.data })
    getMaterials()(dispatch)
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

export const addMaterial = (material, history) => async (dispatch) => {
  try {
    await API('POST', 'v1/admin/materials', material)
    dispatch({ type: ADD_MATERIAL, payload: 'ok' })
    history.goBack()
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

export const deleteMaterial = (_id) => async (dispatch) => {
  try {
    await API('DELETE', 'v1/admin/materials', { _id })
    dispatch({ type: DELETE_MATERIAL, payload: 'ok' })
    getMaterials()(dispatch)
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
