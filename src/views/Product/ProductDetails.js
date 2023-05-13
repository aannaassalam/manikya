import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import styles from "../../styles/Product.module.css";
import "../../App.css";

// import ReactImageZoom from 'react-image-zoom';
import config from "../../core/config";
import { useHistory, useParams } from "react-router-dom";
import HelmetExport from "react-helmet";
import { Rating } from "primereact/rating";
import QuantityManager from "../../components/QuantityManager";
import DummyImage from "../../assets/images/dummy-image.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  add_or_update_cart as addOrUpdateCart,
  delete_from_cart,
} from "../../store/actions/CartAction";
import ReactImageMagnify from "react-image-magnify";

const ProductDetails = () => {
  const authData = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [inCartData, setInCartData] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const [calculatedData, setCalculatedData] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);
  // const [productImages, setProductImages] = useState([]);
  // const [items, setItems] = useState([]);

  const [productImage, setProductImage] = useState(DummyImage);

  const [val2, setVal2] = useState(null);

  const fetchProduct = () => {
    setIsLoading(true);
    axios
      .get(`${config.apiUrl_v1}/product/view/${id}`)
      .then(({ data }) => {
        // console.log("PRODUCT:", data.data);
        console.log(data);

        const imageUrl =
          data.data.product_images &&
          data.data.product_images.length > 0 &&
          data.data.product_images[0].image.trim().split(" ").join("%20");
        const finalImageUrl = imageUrl
          ? `${config.publicImageUrl}/${imageUrl}`
          : DummyImage;

        setProductImage(finalImageUrl);

        setProduct(data.data);
        setCalculatedData({
          item_quantity: 1,
          value: data.data.sp,
          // value: (data.data.sp) - (data.data.sp * data.data.discount/100)
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        setIsLoading(false);
      });
  };

  const getValue = (v) => {
    setCalculatedData({
      item_quantity: v.item_quantity,
      value: v.value,
      // value: (product.discount_type === 'flat') ? (v.value) - (v.value * product.discount/100) : (v.value) - (v.value * product.discount/100)
    });
    setTotalPrice((v.value * product.discount) / 100);
    let item = {
      // user_id: authData.user.id,
      ...product,
      item_id: product.id,
      quantity: v.item_quantity,
    };
    dispatch(addOrUpdateCart(item));
    // console.log("CART_ITEM", item);
  };

  const handleAddToCart = async () => {
    // setIsLoading(true);
    // if(authData.isAuth) {
    //     let item = {
    //         user_id: authData.user.id,
    //         item_id : product.id,
    //         quantity : 1
    //     };
    //     dispatch(addOrUpdateCart(item))
    // } else {
    //     history.push('/login');
    // }
    let item = {
      // user_id: authData.user.id,
      ...product,
      item_id: product.id,
      quantity: 1,
    };
    dispatch(addOrUpdateCart(item));
    // console.log("CART_ITEM", item);
    // localStorage.setItem('cart', JSON.stringify(items));
    // console.log(localStorage.getItem('cart'));
    // var token = localStorage.getItem('token');
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // await axios.post(`${config.apiUrl_v1}/${config.ADD_OR_UPDATE_CART}`, product)
    // .then(({data}) => {
    //     console.log(data);
    //     if(data.status) {
    //         setIsInCart(true);
    //         dispatch(addOrUpdateCart(data.data));
    //         alert('Product added to cart.');
    //     } else {
    //         console.error(data);
    //     }
    //     setIsLoading(false);
    // }).catch((err) => {
    //     console.error(err);
    //     setIsLoading(false);
    // });
  };

  const verifyIsProductInCart = () => {
    // let found = cartData.some(el => el.item_id == product.id);
    let found = false;
    for (var i of cartData) {
      if (i.item_id == product.id) {
        found = true;
        setInCartData(i);
      }
    }
    if (found) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
      setInCartData(null);
    }
    // console.log("Updated Data");
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    verifyIsProductInCart();
  }, [cartData, product]);

  if (isLoading) {
    return <Loader />;
  }

  const returnImage = (item) => {
    let image = item.image.trim().split(" ").join("%20");
    image = image ? `${config.publicImageUrl}/${image}` : DummyImage;

    return (
      <button
        key={item.id}
        onClick={() => {
          setProductImage(image);
        }}
        style={{ backgroundImage: `url(${image})` }}
        className="p-variant-box"
      ></button>
    );
  };

  return (
    <div className="fluid">
      <div className="fluid__image-container">
        {/* <div
                onMouseEnter={() => setIsMouseEnter(true)}
                onMouseLeave={() => setIsMouseEnter(false)}
            > */}
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: productImage,
              // srcSet: this.srcSet,
              sizes:
                "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
            },
            largeImage: {
              src: productImage,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerDimensions: {
              width: "180%",
              height: "100%",
            },
          }}
        />

        {/* </div> */}
        <div className="variant-container">
          {product.product_images.length > 0 &&
            product.product_images.map((item, index) => returnImage(item))}
        </div>
      </div>
      <div className="fluid__instructions">
        <div className={styles.productDetailsContentContainer}>
          <h3 className="text-bold fs-20">
            {product.name}
            {/* &nbsp;&nbsp;
                    <span style={{ margin: 0 }} className={styles.productOfferChip}>
                    {
                        // (product.discount_type === 'flat') 
                        // ? `₹${product.discount} off`
                        // : `${product.discount}% off`
                        `₹${product.mrp - product.sp} off`
                    }</span> */}
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Rating
              value={val2}
              cancel={false}
              onChange={(e) => setVal2(e.value)}
            />
            <span
              className="text-muted"
              style={{
                fontSize: "13px",
                marginTop: "1px",
              }}
            >
              &nbsp;(0 reviews)
            </span>
          </div>
          <hr />
          <div className="row">
            <div className="col-3 col-lg-2">
              <span style={{ margin: 0 }} className={styles.productDiscount}>
                {
                  // (product.discount_type === 'flat')
                  //     ? `-${parseFloat((product.discount / product.mrp) * 100).toFixed(2)}%`
                  //     : `-${product.discount}%`

                  product.discount_type === "flat" ||
                  product.discount_type == null
                    ? `-${parseFloat(
                        (100 * (product.mrp - product.sp)) / product.mrp
                      ).toFixed(2)}%`
                    : `-${product.discount}%`
                }
              </span>
            </div>
            <div className="col-3 col-lg-3">
              <span className={[styles.productSalingPrice]}>
                <sup>₹</sup>
                {
                  // (product.discount_type === 'flat')
                  // ? parseFloat(product.sp - product.discount)
                  // : parseFloat(product.sp - (product.sp * product.discount) / 100)
                  parseFloat(product.sp)
                }
              </span>
            </div>
            <div className="col-12">
              <span className={styles.productMrp}>
                M.R.P.:<strike>₹{product.mrp}</strike>
                <br />
                <small className={styles.productIat}>Incl. of all taxes</small>
              </span>
            </div>
          </div>
          {/* <div className="row">
                    <div className="col-3"><span className={styles.productAttribut}>Price:</span></div>
                    <div className="col-9"><span className={styles.productAttributValue}><strike>₹{product.mrp}</strike></span></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <span className={styles.productAttribut}>Discount Price:</span>
                    </div>
                    <div className="col-9">
                        <span className={[styles.productMainPrice]}>
                            ₹{
                                // (product.discount_type === 'flat') 
                                // ? parseFloat(product.sp - product.discount)
                                // : parseFloat(product.sp - (product.sp * product.discount) / 100)
                                parseFloat(product.sp)
                            } 
                        <small>(incl. of all taxes)</small>
                        </span>
                    </div>
                </div> */}
          <hr />
          <div className="row">
            {isInCart ? (
              <>
                <div className="col-3">
                  <span className={styles.productAttribut}>Quantity:</span>
                </div>
                <div className="col-9">
                  <QuantityManager
                    qty={inCartData.quantity}
                    getValue={getValue}
                    sendValue={product.sp}
                    style={{
                      justifyContent: "flex-start",
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="col-12">
                {/* <button className='btn btn-primary'
                                    onClick={() => {
                                        // window.open(`https://api.whatsapp.com/send?phone=${item.number}`, '_self');
                                        let url = `https://manikyajewellery.com/product/${product.id}`;
                                        let text = `Hey, I want to by *${product.name}-₹${parseFloat(product.sp)}* %0a%0a checkout this link for more information about the product, ${url}`;
                                        window.open(`https://api.whatsapp.com/send?phone=+91${'9903189119'}&text=${text}`, '_self');
                                      }}
                                >BUY NOW</button> */}
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart()}
                >
                  ADD TO CART
                </button>
              </div>
            )}
          </div>
          {/* <hr />
                <div className="row">
                    <div className="col-3">
                        <span className={styles.productAttribut}>Total Price:</span>
                    </div>
                    <div className="col-9">
                        ₹{calculatedData.value}
                    </div>
                </div> */}

          <hr />
          {product.metal && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Metal Type:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.metal}
                </span>
              </div>
            </div>
          )}
          {product.stone && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Stone:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.stone}
                </span>
              </div>
            </div>
          )}
          {product.color && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Color:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.color}
                </span>
              </div>
            </div>
          )}
          {product.weight && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Weight:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.weight}
                </span>
              </div>
            </div>
          )}
          {product.height && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Height:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.height}
                </span>
              </div>
            </div>
          )}
          {product.breadth && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Breadth:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.breadth}
                </span>
              </div>
            </div>
          )}
          {product.length && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Length:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.length}
                </span>
              </div>
            </div>
          )}
          {product.package_weight && (
            <div className="row">
              <div className="col-3">
                <span className={styles.productAttribut}>Package Weight:</span>
              </div>
              <div className="col-9">
                <span className={styles.productAttributValueSm}>
                  {product.package_weight}
                </span>
              </div>
            </div>
          )}
          <hr />
          <h5 style={{ margin: "10px 0px", fontSize: "15px" }}>Description</h5>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
          <hr />
          {isInCart ? (
            <button
              className="btn btn-danger-lite"
              onClick={() => dispatch(delete_from_cart(inCartData.item_id))}
            >
              REMOVE FROM CART
            </button>
          ) : null}
          {/* <a href="tel:+917001051119" className='btn btn-primary'>ADD TO CART</a> */}
        </div>
      </div>
      <div style={{ height: "500px" }} />
    </div>
  );
};

export default ProductDetails;
