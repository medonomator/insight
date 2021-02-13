import { GET_MATERIAL_TAGS, GET_MATERIALS } from '../constants'

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
    case GET_MATERIALS:
      return {
        ...state,
        materials: action.payload,
      }
    case 'INCREMENT':
      return {
        ...state,
        materials: action.payload,
      }
    case 'INCREMENT_ASYNC':
      return {
        ...state,
        materials: action.payload,
      }
    default:
      return state
  }
}
