export const set_config = (data) => {
    return (dispatch) => {
        dispatch({
            type: "SET_CONFIG",
            payload: data
        });
    };
}