import { createSlice } from "@reduxjs/toolkit";

const productsFeedSlice = createSlice({
  name: "productsFeed",
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
  },
});

export const { setProducts, addProducts } = productsFeedSlice.actions;

export default productsFeedSlice.reducer;
