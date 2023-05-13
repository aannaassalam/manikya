import { legacy_createStore as  createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import AuthReducer from "./reducers/AuthReducer";
import CartReducer from "./reducers/CartReducer";
import ConfigReducer from "./reducers/ConfigReducer";

//reducers

const store = combineReducers({
    auth: AuthReducer,
    app_config: ConfigReducer,
    cart: CartReducer,
});

const middlewareStore = applyMiddleware (ReduxThunk)(createStore)
export default middlewareStore(store,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );