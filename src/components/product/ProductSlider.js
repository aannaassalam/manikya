import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import ProductTile from './ProductTile';
import styles from './ProductSlider.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { add_or_update_cart as addOrUpdateCart } from '../../store/actions/CartAction';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination, Navigation } from "swiper";

const ProductSlider = ({items = []}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const cartData = useSelector(state => state.cart);

    const responsiveOptions = {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    };
     
      const handleAddToCart = async (product) => {
        var temp = cartData.filter((item) => item.id == product.id);
        let item = {};
        if (temp.length > 0) {
          item = {
            ...product,
            item_id: product.id,
            quantity: temp[0].quantity + 1,
          }
          console.log(item);
        } else {
          item = {
            ...product,
            item_id: product.id,
            quantity: 1
          }
        }
        dispatch(addOrUpdateCart(item))
      };
    


    useEffect(() => {
    
    }, []); 


    return (
        <div className={styles.productCarousel}>
             <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                // loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={false}
                breakpoints={responsiveOptions}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='productSlider'
            >
                {
                    items && items.length != 0 &&
                    items.map((product,i) => {
                        return  <SwiperSlide key={i}>
                                    <ProductTile onViewDetails={() => history.push(`/product/${product.id}`)} onAddToCart={() => handleAddToCart(product)} item={product}/>
                                </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    );
}

export default ProductSlider;