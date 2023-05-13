import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/fonts/BrittanySignature.ttf"
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import axios from "axios";

import config from "./core/config";
import { loadCartData } from "./store/actions/CartAction";

const root = ReactDOM.createRoot(document.getElementById("root"));

let token = localStorage.getItem("token");
let cart = localStorage.getItem("cart");
// const jwt_secret = config.jwt_secret;

const RenderApp = () => {
  return root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

const splashEvents = async () => {
  await axios
    .get(`${config.apiUrl_v1}/${config.APP_CONFIG_URI}`)
    .then(({ data }) => {
      console.log(data.data);
      store.dispatch({ type: "SET_CONFIG", payload: data.data });
    })
    .catch((err) => {
      console.error(err);
    });
    store.dispatch(loadCartData());
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
        .get(`${config.apiUrl_v1}/${config.AUTH_USER}`)
        .then((res) => {
          store.dispatch({ type: "SET_LOGIN", payload: res.data.data });
        })
        .catch((err) => {
          console.error(err);
          localStorage.clear();
        });
    }
  return true;
};

splashEvents()
  .then((res) => {
    RenderApp();
  })
  .catch((err) => {
    console.log("====================================");
    console.log("Config Error", err);
    console.log("====================================");
    alert("Website Down contact to developer")
  });
