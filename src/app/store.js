import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice.js";
import productsFeedReducer from "../features/productsFeedSlice.js";
import cartReducer from "../features/cartSlice.js";
import wishlistReducer from "../features/wishlistSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    productsFeed: productsFeedReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
