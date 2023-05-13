import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import styles from '../../styles/TestimonialsSection.module.css';


function TestimonialsSection() {
  return (
    <section className={styles.TestimonialsSection}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <p className='text-prefix text-uppercase text-center mb-1'>Clien Testimonial</p>
                    <h2 className='text-center text-primary mb-2'>Our Happy Clients</h2>
                </div>
                <div className='col-lg-12'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        }}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className={styles.swiperTestimonials}
                        style={{
                            height: "400px"
                        }}
                    >
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                        <SwiperSlide className={styles.testimonialsItem}><TestimonialsItem /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </section>
  )
}

const TestimonialsItem = () => {
    return <div className={styles.testimonialsItemInner}>
        <div className={styles.tesItemImage}>
            <img src={"https://astergo.in/avatar.png"} style={{width: "100px"}} alt='avatar' />
        </div>
        <div className={styles.tesItemContent}>
            <h4>Satyajit Kumar</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, molestiae placeat. Necessitatibus numquam ad iste asperiores maiores odit repellat consectetur sit! Ratione ut amet harum delectus iure repellat culpa eos?</p>
        </div>
    </div>
}

export default TestimonialsSection;