import React, { useState, useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import DummyImage from "../../assets/images/dummy-image.jpg";
import QuantityManager from "../../components/QuantityManager";
import { useDispatch, useSelector } from "react-redux";
import { add_or_update_cart as addOrUpdateCart } from '../../store/actions/CartAction';
import config from "../../core/config";

const CartItem = ({ item = {}, qty = 1, size = "large" }) => {

  const [calculatedData, setCalculatedData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const cartData = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const getValue = (v) => {
    setCalculatedData({
      item_quantity: v.item_quantity,
      value: v.value
      // value: (product.discount_type === 'flat') ? (v.value) - (v.value * product.discount/100) : (v.value) - (v.value * product.discount/100) 
    });

    setTotalPrice((v.value * item.discount / 100));
    let product = {
      // user_id: authData.user.id,
      ...item,
      item_id: item.id,
      quantity: v.item_quantity
    };
    dispatch(addOrUpdateCart(product))
    // console.log("CART_ITEM", item);
  }
  if(size == 'large') {
    return (
      <div className="cartItemBox" style={{marginBottom: "15px"}}>
        <div className={`row no-gutters`}>
          <div className={`col-lg-2`}>
            <img
              src={item.product_images.length > 0 ? `${config.publicImageUrl}/${item.product_images[0].image}` : `${DummyImage}`}
              width={`75%`}
              height="100%"
              layout="responsive"
            />
          </div>
          <div className={`col-lg-10 ${styles.itemContentLarge}`} >
            <div>
              <h4>
                <b>{item.name ?? ""}</b>
              </h4>
            </div>
            <div className={styles.itemPriceContainer}>
              <div>
                  <span style={{ margin: 0 }} className={styles.productDiscount}>
                    {/* {item.discount_type === "flat"
                      ? `-${parseFloat((item.discount / item.mrp) * 100).toFixed(
                        2
                      )}%`
                      : `-${item.discount}%`} */}

                      {
                        (item.discount_type === 'flat' || item.discount_type == null)
                        ? `-${parseFloat(100 * (item.mrp - item.sp) / item.mrp).toFixed(2)}%`
                        : `-${item.discount}%`
                      }
                  </span>
              </div>
              <div>
                  <span className={[styles.productSalingPrice]}>
                    <sup>₹</sup>
                    {
                      // (product.discount_type === 'flat')
                      // ? parseFloat(product.sp - product.discount)
                      // : parseFloat(product.sp - (product.sp * product.discount) / 100)
                      parseFloat(item.sp)
                    }
                  </span>
              </div>
              <div>
                <span className={styles.productMrp}>
                  M.R.P.:<strike>₹{item.mrp}</strike>
                  {/* <br /> */}
                  <small className={styles.productIat}>
                    Incl. of all taxes
                  </small>
                </span>
              </div>
            </div>
            <div className={styles.ap}>
              <div className={styles.content}>
                <p>Color : {item.color ?? ''}</p>
                <p>Matal : {item.metal ?? ''}</p>
                <p>Stone : {item.stone ?? ''}</p>
                
              </div>
              <div className={styles.content}>
                <p>Weight : {item.weight}</p>
                <p>Height : {item.height}</p>
                <p>Breadth : {item.breadth}</p>
              </div>
              <div className={styles.content}>
                <p>Length : {item.length}</p>
                <p>Package Weight : {item.package_weight}</p>
              </div>
                <QuantityManager
                  qty={item.quantity}
                  getValue={getValue}
                  sendValue={item.sp}
                  size={size}
                  style={{
                    justifyContent: "flex-start",
                  }}
                />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cartItemBox">
        <div className={`row no-gutters`}>
          <div className={`col-4`}>
            <img
              src={item.product_images.length > 0 ? `${config.publicImageUrl}/${item.product_images[0].image}` : `${DummyImage}`}
              width={`100%`}
              height="100%"
              layout="responsive"
            />
          </div>
          <div className={`col-8 ${styles.itemContentSmall}`}>
            <div>
              <h4>
                <b>{item.name ?? ""}</b>
              </h4>
            </div>
            <div className={styles.itemPriceContainer}>
              <div>
                  <span style={{ margin: 0 }} className={styles.productDiscountSmall}>
                    {/* {item.discount_type === "flat"
                      ? `-${parseFloat((item.discount / item.mrp) * 100).toFixed(
                        2
                      )}%`
                      : `-${item.discount}%`} */}
                       {
                        (item.discount_type === 'flat' || item.discount_type == null)
                        ? `-${parseFloat(100 * (item.mrp - item.sp) / item.mrp).toFixed(2)}%`
                        : `-${item.discount}x%`
                      }
                  </span>
              </div>
              <div>
                  <span className={[styles.productSalingPrice]}>
                    <sup>₹</sup>
                    {
                      // (product.discount_type === 'flat')
                      // ? parseFloat(product.sp - product.discount)
                      // : parseFloat(product.sp - (product.sp * product.discount) / 100)
                      parseFloat(item.sp)
                    }
                  </span>
              </div>
              <div>
                <span className={styles.productMrpSmall}>
                  M.R.P.:<strike>₹{item.mrp}</strike>
                  {/* <br /> */}
                  <small className={styles.productIat}>
                    Incl. of all taxes
                  </small>
                </span>
              </div>
            </div>
            <div className={styles.ap}>
              <div className={styles.content}>
                {/* <p>Size : Large</p>
                <p>Color : Pink</p>
                <p>Type : One</p> */}
                
              </div>
            </div>
            <span className="badge badge-success badge-sm" style={{fontSize: "12px"}}>{item.quantity} item in cart</span>
          </div>
        </div>
      </div>
    );

  }
};

export default CartItem;
