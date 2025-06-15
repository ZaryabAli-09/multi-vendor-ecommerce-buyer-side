import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.cartItems;
    },

    removeFromCart: (state, action) => {
      const updatedCart = state.items.filter(
        (cartItem) => cartItem._id !== action.payload.cartItemId
      );

      state.items = [...updatedCart];
    },

    updateCartItemQuantity: (state, action) => {
      const toUpdateCartItemIndex = state.items.findIndex((cartItem) => {
        return cartItem._id === action.payload.cartItemId;
      });

      state.items[toUpdateCartItemIndex].quantity = action.payload.quantity;

      state.items = [...state.items];
    },
  },
});

export const { setCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
