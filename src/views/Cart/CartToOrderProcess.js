import React, { useEffect, useState, useRef, Fragment } from "react";
import styles from "../../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import HelmetExport from "react-helmet";
import { RadioButton } from "primereact/radiobutton";
import { useFormik } from "formik";
import { AiFillCheckCircle } from "react-icons/ai";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import config from "../../core/config";
import axios from "axios";
import { Toast } from "primereact/toast";
import { set_login as setLogin } from "../../store/actions/AuthAction";
import { clearCart } from "../../store/actions/CartAction";

import ButtonInnerLoader from "../../components/ButtonInnerLoader";
import { useHistory } from "react-router-dom";
import { Base64 } from "js-base64";

import { cashfreeSandbox, cashfreeProd } from "cashfree-dropjs";
import dropinComponent from "../../components/Payment/dropinComponent";

const CartToOrderProcess = () => {
  const cartData = useSelector((state) => state.cart);
  const authData = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [isPaymentUnderProcess, setIsPaymentUnderProcess] = useState(false);
  const [payResponse, setPayResponse] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useRef(null);

  const [addressRadio, setAddressRadio] = useState(false);
  const [payMode, setPayMode] = useState(null);

  const [formInitValue, setFormInitValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  });
  const [formData, setFormData] = useState({});

  const calculateAmount = () => {
    let st = 0;
    // if(cartData.length === 0) {
    //   history.push('/');
    // }
    cartData.map((item) => {
      st += item.quantity * item.sp;
    });
    // alert(st);
    setSubTotal(st);
  };

  useEffect(() => {
    // console.log(cartData);
    // if(cartData.length === 0) {
    //   history.push('/');
    // }

    calculateAmount();

    window.addEventListener("message", (event) => {
      // console.log("Message:"+event.data.msg);
      if (event.data.msg !== null && event.data.msg !== undefined) {
        setPayResponse(event.data.msg);
        setIsPaymentUnderProcess(false);
      }
    });
  }, [cartData]);

  const handleAddressSelection = () => {
    formik.resetForm();
    setAddressRadio(!addressRadio);
    // console.log(authData)
    if (authData.isAuth) {
      setFormInitValue({
        name: authData.user.name ?? "",
        email: authData.user.email ?? "",
        phone: authData.user.phone ?? "",
        address: authData.user.address ?? "",
        state: authData.user.state ?? "",
        city: authData.user.city ?? "",
        landmark: authData.user.landmark ?? "",
        pincode: authData.user.pincode ?? "",
      });
    }
  };

  const openPopupWindow = ({ url, title, w, h }) => {
    // opener.handlePopupResult = (val) => {
    //   setPayResponse("SUCCESS DONE DONA DONE.")
    // }
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,width=${
        w / systemZoom
      }, height=${h / systemZoom}, top=${top}, left=${left}`
    );

    if (window.focus) newWindow.focus();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formInitValue,
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email. E.g. example@email.com";
      }

      if (!data.phone) {
        errors.phone = "Phone is required.";
      } else if (data.phone.length < 10 || data.phone.length > 10) {
        errors.phone = "Phone must be 10 digits.";
      } else if (
        !/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/i.test(
          data.phone
        )
      ) {
        errors.phone = "Invalid phone. E.g. 1002156325";
      }

      if (!data.address) {
        errors.address = "Delivery Address is required.";
      }

      if (!data.landmark) {
        errors.landmark = "Landmark is required.";
      }

      if (!data.state) {
        errors.state = "State is required.";
      }

      if (!data.city) {
        errors.city = "City is required.";
      }

      if (!data.pincode) {
        errors.pincode = "Pincode is required.";
      } else if (isNaN(data.pincode)) {
        errors.pincode = "Invalid pincode.";
      } else if (data.pincode.length < 6 || data.pincode.length > 6) {
        errors.pincode = "Pincode must be 6 digits.";
      }

      return errors;
    },
    onSubmit: async (data) => {
      // console.log(data);
      setFormData(data);
      if (payMode != null) {
        console.log(cartData);
        const userData = `*NEW ORDER*:\nCustomer Name - ${data.name}\nAddress - ${data.address}, ${data.city}, ${data.state},\nPincode - ${data.pincode}\nPhone number - ${data.phone}\n\n*CART ITEMS:*`;
        // console.log(cartData);
        const items = cartData.map(
          (item, idx) =>
            `${idx + 1}. Product Name - ${
              item.name
            }\nProduct URL - https://manikyajewellery.com/product/${
              item.id
            }\nQuantity - ${item.quantity}\nPrice - ₹${
              item.sp * item.quantity
            }\n`
        );
        const footer = `\n*Total Items - ${
          cartData.length
        }*\n*Subtotal - ₹${parseFloat(subTotal).toFixed(
          2
        )}*\n*Delivery Charges - ₹${parseFloat(0).toFixed(
          2
        )}*\n*GST (18%) - ₹${parseFloat((subTotal * 18) / 100).toFixed(
          2
        )}*\n*Total - ₹${parseFloat(subTotal + (subTotal * 18) / 100).toFixed(
          2
        )}*`;

        const cartItems = [userData, ...items, footer];
        console.log(cartItems.join("\n"));
        // let url = `https://manikyajewellery.com/product/${product.id}`;
        let text = encodeURIComponent(cartItems.join("\n"));
        window.open(
          `https://api.whatsapp.com/send?phone=+91${"9903189119"}&text=${text}`,
          "_self"
        );
        //top comment
        // setIsLoading(true);
        // let mainData = {
        //   receiverDetail: data,
        //   orderData: {
        //     sub_total: parseFloat(subTotal).toFixed(2),
        //     total_amount: parseFloat(subTotal + (subTotal * 18) / 100).toFixed(
        //       2
        //     ),
        //     items: cartData,
        //     paymentDetails: {
        //       paymentMode: payMode,
        //     },
        //     shipments: null,
        //   },
        // };
        // // setIsLoading(false);
        // // toast.current.show({severity:'success', summary: 'Success', detail: "order successfull", life: 3000});

        // var token = localStorage.getItem("token");
        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (authData.user.pincode) {
          console.log("?");
          await axios
            .post(
              `${config.apiUrl_v1}/${config.AUTH_USER_UPDATE_SHIPING_DATA}`,
              data
            )
            .then(({ data }) => {
              // console.log("DATA", data.data);
              if (data.status) {
                dispatch(setLogin(data.data));
                // dispatch(clearCart());
                // setIsLoading(false);
                // toast.current.show({severity:'success', summary: 'Success', detail: data.message, life: 3000});
              } else {
                // setIsLoading(false);
                // toast.current.show({severity:'error', summary: 'Error Message', detail: data.message, life: 3000});
              }
            })
            .catch((err) => {
              console.log("ERR:", err);
              setIsLoading(false);
            });
        }

        // // console.log(mainData);
        // await axios
        //   .post(`${config.apiUrl_v1}/${config.CRETE_ORDER}`, mainData)
        //   .then(({ data }) => {
        //     console.log("DATA", data.data);
        //     if (data.status) {
        //       // toast.current.show({severity:'success', summary: 'Success', detail: data.message, life: 3000});
        //       setIsPaymentUnderProcess(true);
        //       setTimeout(() => {
        //         renderDropin();
        //         // openPopupWindow({url: data.data.paymentLink, title: 'Payment Process', w: 900, h: 700});
        //         // history.push('/payment-process');
        //         setIsLoading(false);
        //       }, 1000);
        //     } else {
        //       setIsLoading(false);
        //       // toast.current.show({severity:'error', summary: 'Error Message', detail: data.message, life: 3000});
        //     }
        //   })
        //   .catch((err) => {
        //     console.log("ERR:", err);
        //     setIsLoading(false);
        //   });
        // // formik.resetForm();
        //bottom comment
      } else {
        alert("Please select payment mode!");
      }
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <p className="text-error">{formik.errors[name]}</p>
      )
    );
  };

  if (!cartData) {
    return <Loader />;
  }

  const cbs = (data) => {
    if (data.order && data.order.status == "PAID") {
      alert("order is paid. Call api to verify");
    }
  };

  const cbf = (data) => {
    // alert(data.order.errorText)
    console.log(data);
  };

  const renderDropin = async () => {
    var isProd = true;
    var paymentSessionId = "";
    var token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // await axios.post(`${config.apiUrl_v1}/${config.AUTH_USER_UPDATE_SHIPING_DATA}`, data)
    await axios
      .get(`http://localhost/cashfree/latest/cashfree.php`)
      .then(({ data }) => {
        isProd = data.is_prod;
        paymentSessionId = data.payment_session_id;
        // console.log(paymentSessionId);

        if (paymentSessionId == "") {
          alert("No token specified");
          return;
        }

        let parent = document.getElementById("drop_in_container");
        parent.innerHTML = "";
        let cashfree;
        if (isProd) {
          cashfree = new cashfreeProd.Cashfree();
        } else {
          cashfree = new cashfreeSandbox.Cashfree();
        }
        console.log("before Initialisation");
        cashfree.initialiseDropin(parent, {
          orderToken: paymentSessionId,
          onSuccess: cbs,
          onFailure: cbf,
          components: dropinComponent.components,
          style: dropinComponent.style,
        });
        console.log("after Initialisation");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isPaymentUnderProcess) {
    // return (
    //     <div className="p-5">
    //       <div className="bg-overlay"></div>
    //       <div className="bg-overlay-content">
    //         <h1 className="text-center">
    //           <i className="pi pi-spin pi-spinner" style={{fontSize: "60px", color: "#000"}}></i>
    //         </h1>
    //         <h3 className="text-center">Payment Under processing</h3>
    //         <h6 className="text-center">Please do not refresh or close the window!</h6>
    //         <br />
    //         <h3>{payResponse !== null ? `Loading...` : payResponse}</h3>
    //       </div>
    //     </div>
    // )

    return (
      <div className="p-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="dropin-parent"
              id="drop_in_container"
              style={{ height: "100%" }}
            >
              Payment Under process, please do not refresh or close the window!
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    isPaymentUnderProcess == false &&
    payResponse !== null &&
    payResponse !== undefined
  ) {
    console.log(isPaymentUnderProcess);
    console.log(payResponse);
    history.push("/orders");
  } else {
    return (
      <div className="wrapper">
        <Toast ref={toast} />
        <HelmetExport
          bodyAttributes={{ style: "background-color : var(--light-color)" }}
        />
        <section className="cartSection">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 p-2">
                {/* <div className="card card-body border-0">
                  <h4 className="card-title mb-0">Delivery Details</h4>
                  <hr />
                </div> */}
                <div className="card card-body border-0">
                  <h4 className="card-title mb-0">Delivery Details</h4>
                  <hr />
                  {authData.user.pincode && (
                    <>
                      <div className="row">
                        <div className="col-lg-6">
                          <div
                            className={`addressSelect ${
                              addressRadio ? `addressActive` : ``
                            }`}
                            onClick={handleAddressSelection}
                          >
                            <div className="addressSelect-userAddress">
                              <h6>{authData.user.name ?? ""}</h6>
                              <p className="mb-0">
                                {authData.user.address ?? ""}&nbsp;
                                {authData.user.landmark ?? ""},&nbsp;
                                {authData.user.city ?? ""},&nbsp;
                                {authData.user.state ?? ""},&nbsp;
                                {authData.user.pincode ?? ""}
                              </p>
                              <p className="mb-0">
                                Contact No. : {authData.user.phone ?? ""}
                              </p>
                            </div>
                            <div
                              className="addressSelect-icon"
                              style={addressRadio ? {} : { display: "none" }}
                            >
                              <AiFillCheckCircle />
                            </div>
                            {/* <div className="addressSelect-radio">
                            <RadioButton inputId="city1" name="city" value="true" onChange={(e) => {
                              setAddressRadio(e.value)
              
                            }} checked={addressRadio === '1'} />
                          </div> */}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  )}
                  <form>
                    <div className="row">
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          Full Name{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          autoFocus
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("name"),
                          })}`}
                        />
                        {getFormErrorMessage("name")}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          Phone Number{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("phone"),
                          })}`}
                        />
                        {getFormErrorMessage("phone")}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          Email Address{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("email"),
                          })}`}
                        />
                        {getFormErrorMessage("email")}
                      </div>
                      <div className="col-lg-12 form-group">
                        <label className="form-label">
                          Delivery Address{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("address"),
                          })}`}
                        />
                        {getFormErrorMessage("address")}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          State{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("state"),
                          })}`}
                        />
                        {getFormErrorMessage("state")}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          City{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("city"),
                          })}`}
                        />
                        {getFormErrorMessage("city")}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          Landmark{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formik.values.landmark}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("landmark"),
                          })}`}
                        />
                        {getFormErrorMessage("landmark")}
                      </div>
                      <div className="col-lg-6 form-group">
                        <label className="form-label">
                          Pincode{" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formik.values.pincode}
                          onChange={formik.handleChange}
                          className={`form-control border-lite ${classNames({
                            "is-invalid": isFormFieldValid("pincode"),
                          })}`}
                        />
                        {getFormErrorMessage("pincode")}
                      </div>
                    </div>
                  </form>
                  <br />
                  <h4 className="card-title mb-0">Payment Mode</h4>
                  <hr />
                  <div className="row">
                    <div className="col-lg-6">
                      <div
                        className={`addressSelect  ${
                          payMode == "online" ? `addressActive` : ``
                        }`}
                      >
                        <div className="addressSelect-userAddress">
                          <h6>Online Payment</h6>
                          <p>UPI & Net Banking</p>
                        </div>
                        {/* {
                            addressRadio && 
                            <div className="addressSelect-icon">
                              <AiFillCheckCircle />
                            </div>
                          } */}
                        <div className="addressSelect-radio">
                          <RadioButton
                            inputId="paymode"
                            name="paymode"
                            value="online"
                            onChange={(e) => {
                              setPayMode(e.value);
                            }}
                            checked={payMode === "online"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className={`addressSelect ${
                          payMode == "cod" ? `addressActive` : ``
                        }`}
                      >
                        <div className="addressSelect-userAddress">
                          <h6>Cash On Delivery</h6>
                          <p>Pay on delivery & cash</p>
                        </div>
                        {/* {
                            addressRadio && 
                            <div className="addressSelect-icon">
                              <AiFillCheckCircle />
                            </div>
                          } */}
                        <div className="addressSelect-radio">
                          <RadioButton
                            inputId="paymode"
                            name="paymode"
                            value="cod"
                            onChange={(e) => {
                              setPayMode(e.value);
                            }}
                            checked={payMode === "cod"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 p-2" style={{ minHeight: "280px" }}>
                <div className="card card-body border-0">
                  <h4 className="card-title mb-0">Order Details</h4>
                  <hr />
                  <div className={styles.checkOutList}>
                    <div className={styles.checkOutListItem}>
                      <p>Total Items</p>
                      <p>
                        <b>
                          {cartData.length > 0 && cartData.length.toString()}
                        </b>
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
                      style={{
                        borderTop: "1px solid #ddd",
                        paddingTop: "10px",
                      }}
                    >
                      <h4>Total</h4>
                      <h3>
                        <small>INR</small>&nbsp;₹
                        {parseFloat(subTotal + (subTotal * 18) / 100).toFixed(
                          2
                        )}
                      </h3>
                    </div>
                    <br />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary btn-md btn-block"
                      style={{ letterSpacing: "0.9px", fontWeight: "300" }}
                      onClick={formik.handleSubmit}
                    >
                      {isLoading ? (
                        <ButtonInnerLoader label="Processing..." />
                      ) : (
                        `Proceed To Payment`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default CartToOrderProcess;
