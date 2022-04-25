import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Cart = {
  id: string;
  amount: number;
  itemId: number
};


const rootSlice = createSlice({
  name: 'root',
  initialState: {
    cart: Array(),
    userId: 0,
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.cart.push(action.payload);
    },
    updateUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    updateCart: (state, action: PayloadAction<Cart[]>) => {
      state.cart = action.payload;
    }
  },
})

export const { addToCart, updateUserId, updateCart } = rootSlice.actions;

export const selectUserId = (state: any) => state.root.userId

export default rootSlice.reducer