import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import  orderReducer  from "./orderSlice";
import  goodsReducer  from "./goodsSlice";
// console.log('orderReducer: ', orderReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
  }
})

export default store;