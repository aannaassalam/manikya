const initConfigData = {
    data : {}
}


const ConfigReducer = (state = initConfigData, actions) => {

    switch(actions.type) {
        case "SET_CONFIG":
            return {
                ...state,
                data: actions.payload
            };
            
        default:
            return state;
    }
}

export default ConfigReducer;