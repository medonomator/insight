import { GET_MATERIAL_TAGS } from '../constants'

const initialState = {
  materialTags: [],
  materials: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MATERIAL_TAGS:
      return {
        ...state,
        materialTags: action.payload,
      }
    default:
      return state
  }
}
