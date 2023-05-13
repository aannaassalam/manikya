import React, { useEffect, useState, Fragment } from "react";
import styles from "../../styles/Cart.module.css";
import CartItem from "../../components/Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import HelmetExport from "react-helmet";
import { clearCart } from "../../store/actions/CartAction";
import { useHistory } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import Login from "../Auth/Login";
const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const authData = useSelector((state) => state.auth);
  const [size, setSize] = useState("large");
  const [subTotal, setSubTotal] = useState(0);
  const [loginVisible, setLoginVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const calculateAmount = () => {
    let st = 0;
    cartData.map((item) => {
      st += item.quantity * item.sp;
    });
    // alert(st);
    setSubTotal(st);
  };

  useEffect(() => {
    calculateAmount();

    if (window.screen.width < 648) {
      setSize("small");
    }
  }, [cartData]);

  const proceedToCheckout = () => {
    // alert('Proceed....')
    history.push("/checkout");
    // if (authData.isAuth) {
    //   history.push('/checkout');
    // } else {
    //   setLoginVisible(true)
    // }
  };

  if (!cartData) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <HelmetExport
        bodyAttributes={{ style: "background-color : var(--light-color)" }}
      />
      <section className="cartSection">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-lg-6 col-6">
                  <h4 className="card-title">Your Cart</h4>
                </div>
                <div className="col-lg-2 col-6">
                  {cartData.length > 0 && (
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="btn btn-outline-danger btn-sm float-right"
                    >
                      {" "}
                      Clear cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8 p-2">
              <div className="row">
                {cartData.map((item, i) => (
                  <div key={i} className="col-lg-12">
                    <CartItem qty={item.quantity} size={size} item={item} />
                  </div>
                ))}
                {cartData.length == 0 && (
                  <div className="col-lg-12">
                    <h4>No item in cart!</h4>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 p-2" style={{ minHeight: "280px" }}>
              <div className="card card-body border-0">
                <h4 className="card-title mb-0">Checkout</h4>
                <hr />
                <div className={styles.checkOutList}>
                  <div className={styles.checkOutListItem}>
                    <p>Total Items in Cart</p>
                    <p>
                      <b>{cartData.length > 0 && cartData.length.toString()}</b>
                    </p>
                  </div>
                  <div className={styles.checkOutListItem}>
                    <p>Subtotal</p>
                    <p>
                      <b>₹{parseFloat(subTotal).toFixed(2)}</b>
                    </p>
                  </div>
                  <div className={styles.checkOutListItem}>
                    <p>Delivery Charge</p>
                    <p>
                      <b>₹{parseFloat(0).toFixed(2)}</b>
                    </p>
                  </div>
                  <div className={styles.checkOutListItem}>
                    <p>GST (18%)</p>
                    <p>
                      <b>₹{parseFloat((subTotal * 18) / 100).toFixed(2)}</b>
                    </p>
                  </div>
                  <div
                    className={styles.checkOutListItem}
                    style={{ borderTop: "1px solid #ddd", paddingTop: "10px" }}
                  >
                    <h4>Total</h4>
                    <h3>
                      <small>INR</small>&nbsp;₹
                      {parseFloat(subTotal + (subTotal * 18) / 100).toFixed(2)}
                    </h3>
                  </div>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary btn-md btn-block"
                    style={{ letterSpacing: "0.9px", fontWeight: "300" }}
                    onClick={proceedToCheckout}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sidebar
        position="right"
        style={{ width: window.screen.width > 648 ? "400px" : "100%" }}
        visible={loginVisible}
        onHide={() => setLoginVisible(false)}
      >
        <Login
          isComponentLogin
          onClose={() => {
            setLoginVisible(false);
            history.push("/checkout");
          }}
        />
      </Sidebar>
    </div>
  );
};

export default Cart;
