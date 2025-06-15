import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload.wishlistItems;
    },
    removeFromWishlist: (state, action) => {
      const updateWishlist = state.items.filter(
        (wishlistItem) => wishlistItem._id !== action.payload.wishlistItemId
      );

      state.items = updateWishlist;
    },
  },
});

export const { setWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
