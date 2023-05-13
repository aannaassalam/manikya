import { CLEAR_CART, DECREASE_FROM_CART, DELETE_FROM_CART } from "../actions/CartAction";

const initCartData = [];


const CartReducer = (state = initCartData, actions) => {
    let temp = []
    let found;
    switch (actions.type) {
        case "ADD_OR_UPDATE_CART":
            found = false
            temp = state.map(item => {
                if (item.item_id == actions.payload.item_id) {
                    found = true;
                    return {
                        ...actions.payload,
                        
                    }
                }
                return item
            })
            if(!found){
                temp = [...temp,actions.payload]
            }
            localStorage.setItem('cart', JSON.stringify(temp))
            // console.log('CART_ADDED',temp)
            return temp
        case DELETE_FROM_CART:
            temp = state.filter(item => (item.item_id != actions.payload))
            localStorage.setItem('cart', JSON.stringify(temp))
            return temp
        case "LOAD_CART_DATA":
            return actions.payload;
        case CLEAR_CART:
            localStorage.removeItem('cart')
            return [];

        default:
            return state;
    }
}




export default CartReducer;