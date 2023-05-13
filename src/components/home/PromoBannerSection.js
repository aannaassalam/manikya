import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";


import styles from '../../styles/Home.module.css';

// import required modules
import { EffectFade, Autoplay, Pagination } from "swiper";

function PromoBannerSection() {
  return (
    <div>
        <Swiper
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        className="mySwiper"
      >
         <SwiperSlide className={styles.swiperItem}><div style={{backgroundImage: `url(https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Diamonds_banner_2_thumb_61466c50-3bfb-4d54-a2b3-205219e956f5.jpg?v=1511876014)`}}></div></SwiperSlide>
        <SwiperSlide className={styles.swiperItem}><div style={{backgroundImage: `url(https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Valentines_Banner_1003_thumb_8f67e383-8e98-45bb-8a8e-8e296cddbb1b.jpg?v=1516016644)`}}></div></SwiperSlide>
        <SwiperSlide className={styles.swiperItem}><div style={{backgroundImage: `url(https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Diamonds_banner_2_thumb_61466c50-3bfb-4d54-a2b3-205219e956f5.jpg?v=1511876014)`}}></div></SwiperSlide>
        <SwiperSlide className={styles.swiperItem}><div style={{backgroundImage: `url(https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Valentines_Banner_1003_thumb_8f67e383-8e98-45bb-8a8e-8e296cddbb1b.jpg?v=1516016644)`}}></div></SwiperSlide>
        <SwiperSlide className={styles.swiperItem}><div style={{backgroundImage: `url(https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Diamonds_banner_2_thumb_61466c50-3bfb-4d54-a2b3-205219e956f5.jpg?v=1511876014)`}}></div></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default PromoBannerSection;