import { API } from '../helpers/axios'
import {
  GET_MATERIAL_TAGS,
  GET_MATERIALS,
  SHOW_NOTIFICATION,
  GET_APHORISMS,
} from '../redux/constants'
import { getAphori} from '../redux/reducers/aphorisms'

export const getMaterialTags = () => async (dispatch) => {
  try {
    const res = await API('GET', 'v1/admin/material-tags')
    // dispatch(getAphori({ aphorisms: res.data.data, isLoading: true }))
    dispatch({ type: GET_MATERIAL_TAGS, payload: res.data.data })
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

export const getMaterials = () => async (dispatch) => {
  try {
    const res = await API('GET', 'v1/admin/materials')
    dispatch({ type: GET_MATERIALS, payload: res.data.data.reverse() })
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

export const getAphorisms = () => async (dispatch) => {
  try {
    const res = await API('GET', 'v1/admin/aphorisms')
    dispatch({ type: GET_APHORISMS, payload: res.data.data.reverse() })
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
