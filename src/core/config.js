const config = {
    rootUrl : `https://portal.manikyajewellery.com`,
    apiUrl_v1 : `https://portal.manikyajewellery.com/api/v1`,
    publicImageUrl : `https://portal.manikyajewellery.com`,
    authImageUrl : `https://portal.manikyajewellery.com/image`,

    // rootUrl : `http://localhost:8000`,
    // apiUrl_v1 : `http://localhost:8000/api/v1`,
    // publicImageUrl : `http://localhost:8000`,
    // authImageUrl : `http://localhost:8000/image`,
    
    // rootUrl : `http://192.168.29.55:8000`,
    // apiUrl_v1 : `http://192.168.29.55:8000/api/v1`,
    // publicImageUrl : `http://192.168.29.55:8000`,
    // authImageUrl : `http://192.168.29.55:8000/image`,
    
    LOGIN_URI : `login`, 
    REGISTER_URI : `register`, 
    LOGOUT_URI : `auth/logout`, 
    AUTH_USER : `auth/user`, 
    AUTH_USER_UPDATE_SHIPING_DATA : `auth/user/updateUserShipingData`, 
    APP_CONFIG_URI: `web-config`,
    CART_ITEM_LIST: `auth/product/cart`,
    ADD_OR_UPDATE_CART: `auth/product/cart/add-or-update-cart`,
    CRETE_ORDER: `auth/order/store`,
    GET_AUTH_USER_ORDERS: `auth/order`,
    apiRoutes : {
        homePage : `homepage`,
    },

    colors : {
        colorLight: '#f2f3f8',
    }
}

export default config;