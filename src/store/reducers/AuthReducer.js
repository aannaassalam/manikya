const initAuthData = {
    isAuth : false,
    user :{}
};

const AuthReducer = (state = initAuthData, actions) => {

    switch(actions.type) {
        case "SET_LOGIN":
            return {
                ...state,
                isAuth: true,
                user: actions.payload
            };
        case "MAKE_LOGOUT":
            return {
                ...state,
                isAuth: false,
                user: {}
            };
        default:
            return state;
    }
}

export default AuthReducer;