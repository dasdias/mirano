import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: "bouquets",
  minPrice: "",
  maxPrice: "",
  category: "",
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {}
});

// export const {} = filterSlice.actions

export default filterSlice.reducer