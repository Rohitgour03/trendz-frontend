import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        filterOptions: {
            price: [],
            design: [],
            sleeve: [],
            fit: [],
        }
    },
    reducers: {
        filterPdts: (state, action) => {
            switch(action.payload.type){
                case 'add_prices': 
                    state.filterOptions.price.push(action.payload.label)
                    return;

                case 'remove_prices':
                    const priceArr = [...state.filterOptions.price]
                    state.filterOptions = {
                        ...state.filterOptions,
                        price: priceArr.filter(str => str !== action.payload.label)
                    }
                    return; 
                
                case 'add_sleeve':
                    state.filterOptions.sleeve.push(action.payload.label)
                    return;
                
                case 'remove_sleeve':
                    const sleeveArr = [...state.filterOptions.sleeve]
                    state.filterOptions = {
                        ...state.filterOptions,
                        sleeve: sleeveArr.filter(str => str !== action.payload.label)
                    }
                    return;
                
                case 'add_design':
                    state.filterOptions.design.push(action.payload.label)
                    return;

                case 'remove_design':
                    const designArr = [...state.filterOptions.design]
                    state.filterOptions = {
                        ...state.filterOptions,
                        design: designArr.filter(str => str !== action.payload.label)
                    }
                    return;

                case 'add_fit':
                    state.filterOptions.fit.push(action.payload.label)
                    return;

                case 'remove_fit':
                    const fitArr = [...state.filterOptions.fit]
                    state.filterOptions = {
                        ...state.filterOptions,
                        fit: fitArr.filter(str => str !== action.payload.label)
                    }
                    return;
            }
        }
    }
})

export const { filterPdts } = filterSlice.actions
export default filterSlice.reducer