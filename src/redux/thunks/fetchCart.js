import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch(`${API_URL}/api/cart`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Не удалось получить данные корзины');
  }
  return await response.json();
});