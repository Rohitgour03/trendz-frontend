import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => { 
       
      const pdt = state.cartItems.find(item => {
        (item.id === action.payload.id 
        && item.size === action.payload.size)
      })

      if(pdt){
        pdt.quantity += action.payload.quantity;
        pdt.price = pdt.pricePerQuantity * pdt.quantity
        pdt.oldPrice = pdt.oldPricePerQuantity * pdt.quantity
      } else{
        state.cartItems.push(action.payload)
      }
    },

    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map(item => {
        if(item.id === action.payload.id){
          return action.payload
        }
        return item
      })

    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => {
        return item.id !== action.payload.id
      })
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer