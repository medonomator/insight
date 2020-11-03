import { API } from '../helpers/axios'
import { GET_MATERIAL_TAGS } from '../redux/constants'

export const getMaterialTags = () => async (dispatch) => {
  try {
    const res = await API('GET', 'v1/admin/material-tags')
    dispatch({ type: GET_MATERIAL_TAGS, payload: res.data.data })
    return res
  } catch (error) {
    // TODO: need dispatch global error
  }
}
