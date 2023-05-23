import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'
import filtersReducer from './filterSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
  },
})