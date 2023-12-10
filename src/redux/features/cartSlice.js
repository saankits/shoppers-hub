import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    carts : []
}

// cart slice

const cartSlice = createSlice({
    name : "cartslice",
    initialState,
    reducers : {

        // add to cart
        addToCart : (state, action) => {

            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0){
                state.carts[itemIndex].qnty += 1
            }else{
                const temp = {...action.payload, qnty: 1}
                state.carts = [...state.carts, temp]
            }
            
        },
        // remove item from cart
        removeToCart : (state, action) => {
            const data = state.carts.filter((element)=>element.id !== action.payload)
            state.carts = data
        },
        // handle decrement
        reduceQuantity : (state, action) => {
            const itemindex_dec = state.carts.findIndex((item) => item.id === action.payload.id);

            if(state.carts[itemindex_dec].qnty >=1){
                state.carts[itemindex_dec].qnty -= 1
            }
        },
        //empty cart
        emptyCart : (state,action)=>{
            state.carts = []
        }

    }
})

export const {addToCart, removeToCart, reduceQuantity, emptyCart} = cartSlice.actions;
export default cartSlice.reducer