import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    id: null,
    isLoggedIn: false,
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    province: "",
    city: "",
    remainingAddress: "",
    notes: "",
    cartItemsCount: 0,
    wishlistItemsCount: 0,
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;

      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.country = action.payload.country;
      state.province = action.payload.province;
      state.city = action.payload.city;
      state.remainingAddress = action.payload.remainingAddress;
      state.notes = action.payload.notes;

      state.cartItemsCount = action.payload.cartItemsCount;
      state.wishlistItemsCount = action.payload.wishlistItemsCount;
    },

    logout: (state) => {
      state.isLoggedIn = false;

      state.name = "";
      state.email = "";
      state.phoneNumber = "";
      state.country = "";
      state.province = "";
      state.city = "";
      state.remainingAddress = "";
      state.notes = "";

      state.cartItemsCount = 0;
      state.wishlistItemsCount = 0;
    },

    updateCartItemsCount: (state, action) => {
      state.cartItemsCount = action.payload.cartItemsCount;
    },

    updateWishlistItemsCount: (state, action) => {
      state.wishlistItemsCount = action.payload.wishlistItemsCount;
    },
  },
});

export const { login, logout, updateCartItemsCount, updateWishlistItemsCount } =
  userSlice.actions;

export default userSlice.reducer;
