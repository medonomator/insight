import { API } from '../../helpers/axios'
import { createSlice } from '@reduxjs/toolkit'

const aphirismsSlice = createSlice({
  name: 'aphorisms',
  initialState: [],
  reducers: {
    getAphorisms: async (state, action) => {
      const res = await API('GET', 'v1/admin/materials')
      return state = res.data.data
    },
  },
})

export const { getAphorisms } = aphirismsSlice.actions
export default aphirismsSlice.reducer
