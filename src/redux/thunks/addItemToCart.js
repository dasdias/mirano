import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ productId, quantity }) => {
  const response = await fetch(`${API_URL}/api/cart/items`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity })
  });
  if (!response.ok) {
    throw new Error('Не удалось отправить товар в корзину');
  }
  return await response.json();
});