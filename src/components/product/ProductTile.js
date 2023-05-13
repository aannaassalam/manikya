import React, { useState, useEffect } from "react";
import config from "../../core/config";
import styles from "../../styles/Product.module.css";
import { Rating } from "primereact/rating";
import DummyImage from "../../assets/images/dummy-image.jpg";

import { useSelector } from "react-redux";
import ButtonInnerLoader from "../ButtonInnerLoader";
import { useHistory } from "react-router-dom";

function ProductTile({
  item = {},
  onViewDetails = () => {},
  onAddToCart = () => {},
}) {
  const cartData = useSelector((state) => state.cart);
  const [val2, setVal2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageUrl =
    item.product_images &&
    item.product_images.length > 0 &&
    item.product_images[0].image;
  // const imageUrl = item.product_images.length > 0 && item.product_images[0].image.trim().split(" ").join("%20");
  const finalImageUrl = imageUrl && `${config.publicImageUrl}/${imageUrl}`;
  const history = useHistory();
  return (
    <div className={styles.productTile}>
      {/* {console.log(imageUrl)} */}
      {item.product_images.length > 0 ? (
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url(${finalImageUrl})` }}
        ></div>
      ) : (
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url(${DummyImage})` }}
        ></div>
      )}
      <div className={styles.productContent}>
        <div className={styles.row} style={{ marginBottom: "4px" }}>
          <p className={styles.productTileSalingPrice}>
            <sup>₹</sup>
            {parseFloat(item.sp)}
          </p>
          <p className={styles.productTileMrp}>
            <strike>₹{item.mrp}</strike>
          </p>
          <p className={styles.productTileDiscount}>
            <small>
              (
              {/* {
              (item.discount_type === 'flat' || item.discount_type == null)
              ? `-${parseFloat((item.mrp - item.sp) / 100).toFixed(2)}%`
              : `-${item.discount}%`
              
            }  */}
              {item.discount_type === "flat" || item.discount_type == null
                ? `${parseFloat(
                    (100 * (item.mrp - item.sp)) / item.mrp
                  ).toFixed(2)}%`
                : `${item.discount}%`}{" "}
              off)
            </small>
          </p>
        </div>
        <h4 className={styles.productTitle}>{item.name ?? ""}</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: "5px",
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
        <div className={`${styles.buttonContainer} mt-2 mb-2`}>
          <button
            onClick={() => onViewDetails()}
            className={`btn btn-accent ${styles.productBtn}`}
          >
            View Details
          </button>
          {/* <button
            onClick={() => {
              // window.open(`https://api.whatsapp.com/send?phone=${item.number}`, '_self');
              let url = `https://manikyajewellery.com/product/${item.id}`;
              let text = `Hey, I want to by *${item.name}-₹${parseFloat(item.sp)}* %0a%0a checkout this link for more information about the product, ${url}`;
              window.open(`https://api.whatsapp.com/send?phone=+91${'9903189119'}&text=${text}`, '_self');
            }}
            className={`btn btn-primary ${styles.productBtn}`}
          >Buy Now</button> */}
          {cartData.some((data) => data.id === item.id) ? (
            <button
              onClick={() => history.push("/cart")}
              className={`btn btn-primary ${styles.productBtn}`}
            >
              Go to Cart
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  onAddToCart();
                  setIsLoading(false);
                }, 1000);
              }}
              className={`btn btn-primary ${styles.productBtn}`}
            >
              {console.log()}
              {isLoading ? <ButtonInnerLoader /> : `Add to Cart`}
            </button>
          )}
        </div>
        {/* <br /> */}
      </div>
    </div>
  );
}

export default ProductTile;
