import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "./App.css";
import "./index.css";

import Layout from "./components/Layout";
import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Home from "./views/Home";
import TestPage from "./views/TestPage";
import CategoryWiseProducts from "./views/Product/CategoryWiseProducts";
import ProductDetails from "./views/Product/ProductDetails";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";

import AuthRoute from "./routes/AuthRoute";
import GuestRoute from "./routes/GuestRoute";
import About from "./views/About";
import Cart from "./views/Cart/Cart";
import Profile from "./views/Auth/Profile";
import Orders from "./views/Order/Orders";
import CartToOrderProcess from "./views/Cart/CartToOrderProcess";
import Contact from "./views/Contact";
import ShipingPolicy from "./views/Polices/ShipingPolicy";
import RefundPolicy from "./views/Polices/RefundPolicy";
import TermsAndCondition from "./views/Polices/TermsAndCondition";
import PrivacyPolicy from "./views/Polices/PrivacyPolicy";
import Success from "./views/Success";
import PaymentSuccess from "./views/Payment/PaymentSuccess";
import PaymentProcess from "./views/Payment/PaymentProcess";
import ScrollTop from "./components/ScrollTop";
import PageNotFond from "./views/PageNotFond";

const App = () => {
  const location = useLocation();
  return (
    <Layout
      title="Home"
      visible={location.pathname === "/payment-success" ? false : true}
    >
      <ScrollTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute path="/testpage" component={TestPage} />
        <AuthRoute path="/profile" component={Profile} />
        <AuthRoute path="/orders" component={Orders} />
        <Route path="/category/:id" component={CategoryWiseProducts} />
        <Route path="/product/:id" component={ProductDetails} />
        {/* <ProductDetails /> */}
        {/* </Route> */}

        <Route path="/payment-process" component={PaymentProcess} />
        <Route path="/payment-success" component={PaymentSuccess} />
        <Route path="/termsandcondition" component={TermsAndCondition} />
        <Route path="/shipingpolicy" component={ShipingPolicy} />
        <Route path="/refundpolicy" component={RefundPolicy} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        {/* <AuthRoute path='/checkout' component={CartToOrderProcess} /> */}
        <Route path="/checkout" component={CartToOrderProcess} />
        <Route path="/test/:url" component={TestPage} />
        <Route path="/about-us" component={About} />
        <GuestRoute path="/register" component={Register} />
        <GuestRoute path="/login" component={Login} />
        <Route path="*" component={PageNotFond} />
      </Switch>
    </Layout>
  );
};

export default App;
