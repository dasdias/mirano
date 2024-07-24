import { createSlice } from "@reduxjs/toolkit"
import { registerCart } from "../thunks/registerCart";
import { fetchCart } from "../thunks/fetchCart";
import { addItemToCart } from "../thunks/addItemToCart";

const initialState = {
  isOpen: false,
  items: [],
  status: 'idle',
  accesskey: null,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerCart.pending, (state) => {
      state.status = 'loading';
    }).addCase(registerCart.fulfilled, (state, action) => {
      state.status = 'success';
      state.accesskey = action.payload.accessKey;
    }).addCase(registerCart.rejected, (state, action) => {
      state.status = 'failed';
      state.accesskey = '';
      state.accesskey = action.error.message;
    })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      }).addCase(fetchCart.fulfilled, (state, action) => {
        // console.log('action.payload: ', action);
        state.status = 'success';
        state.items = action.payload;
      }).addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      }).addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      }).addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})
export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;