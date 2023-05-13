import axios from "axios";
import config from "../../core/config";
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const DECREASE_FROM_CART = 'DECREASE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const add_or_update_cart = (data) => {

    return (dispatch) => {
        dispatch({
            type: "ADD_OR_UPDATE_CART",
            payload: data
        });
    };
}
export const decrease_from_cart = (data) => {

    return (dispatch) => {
        dispatch({
            type: DECREASE_FROM_CART,
            payload: data
        });
    };
}
export const delete_from_cart = (id) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_FROM_CART,
            payload: id
        });
    };
}

export const loadCartData =  () => {
    return async (dispatch, getState) => {
        // var token = localStorage.getItem('token');
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // await axios.get(`${config.apiUrl_v1}/${config.CART_ITEM_LIST}`).then(({data}) => {
        //     dispatch({
        //         type: "LOAD_CART_DATA",
        //         payload: data.data
        //     });
        // }).catch((err) => {
        //     console.error(err);
        // });
        let auth = getState().auth
        let cartItems = localStorage.getItem('cart')  ;
        if(cartItems != null){
            // console.log("CART : ",localStorage.getItem('cart'))
            dispatch({
                type: "LOAD_CART_DATA",
                payload: JSON.parse(cartItems)
            });
        }
    }
}

export const clearCart =  () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_CART,
        });
    }
}