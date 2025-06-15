import { createSlice } from "@reduxjs/toolkit";

const productsFeedSlice = createSlice({
  name: "productsFeed",
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsFeedSlice.actions;

export default productsFeedSlice.reducer;
