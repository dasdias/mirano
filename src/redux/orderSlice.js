import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const";
import { fetchCart, toggleCart } from "./cartSlice";

export const sendOrder = createAsyncThunk("order/sendOrder", async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const { order: {
      data: {
        buyerName,
        buyerPhone,
        recipientName,
        recipientPhone,
        street,
        house,
        apartment,
        paymentOnline,
        deliveryDate,
        deliveryTime,
      },
    } } = getState();

    const orderData = {
      "buyer": {
        "name": buyerName,
        "phone": buyerPhone,
      },
      "recipient": {
        "name": recipientName,
        "phone": recipientPhone,
      },
      "address": `${street}, ${house}, ${apartment}`,
      paymentOnline,
      deliveryDate,
      deliveryTime,
    }

    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData })
    });
    if (!response.ok) {
      throw new Error('Не удалось оформить заказ!');
    }

    dispatch(clearOrder());
    dispatch(toggleCart());
    dispatch(fetchCart());

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isOpen: false,
  orderId: "",
  status: 'idle',
  error: null,
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: "true",
    deliveryDate: '',
    deliveryTime: '',
  },
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    clearOrder(state) {
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: "true",
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrderData(state, action) {
      state.data = { ...state.data, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => {
      state.orderId = '';
      state.status = 'loading';
    }).addCase(sendOrder.fulfilled, (state, action) => {
      state.status = 'success';
      state.orderId = action.payload.orderId;
    }).addCase(sendOrder.rejected, (state, action) => {
      state.status = 'error';
      state.orderId = '';
      state.error = action.payload || action.error.message;
    })
  }

})

export const { openModal, closeModal, updateOrderData, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
