import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import  toggleModal  from "./modalSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: toggleModal,
  }
})

export default store;