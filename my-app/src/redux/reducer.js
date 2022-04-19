import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    cart : [],
    userId : 0,
  },
  reducers: {
    addToCart : (state, action) => {
      state.cart.push(action.payload);
    },
    updateUserId : (state, action) => {
      state.userId = action.payload;
    },
    updateCart : (state, action) => {
      state.cart = action.payload;
    }
  },
})

export const {addToCart , updateUserId, updateCart } = rootSlice.actions;

export const selectUserId  = (state) => state.root.userId

export default rootSlice.reducer