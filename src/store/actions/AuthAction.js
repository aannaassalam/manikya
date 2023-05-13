import axios from "axios";
import config from "../../core/config";
// import { setWallet } from "./WalletActions";

export const set_login = (data) => {
    return (dispatch) => {
        dispatch({
            type: "SET_LOGIN",
            payload: data
        });
    };
}

export const make_logout = () => {
    return async (dispatch) => {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post(`${config.apiUrl_v1}/${config.LOGOUT_URI}`, {
            token: token
        }).then((res) => {
            dispatch({
                type: "MAKE_LOGOUT"
            });
            localStorage.clear();

        }).catch((err) => {
            console.error(err);
        });
    }
}