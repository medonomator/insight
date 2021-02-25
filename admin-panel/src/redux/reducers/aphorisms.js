import { createSlice } from '@reduxjs/toolkit'

const aphirismsSlice = createSlice({
  name: 'aphorisms',
  initialState: [],
  reducers: {
    getAphorisms: (state, action) => {
 
      state.aphorisms = action.payload
      state.isLoading = false
    },
  },
})

export const { getAphori } = aphirismsSlice.actions
export default aphirismsSlice.reducer
