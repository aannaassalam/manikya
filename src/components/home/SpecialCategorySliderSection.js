import React, {useEffect, useState} from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import styles from '../../styles/SpecialCategorySliderSection.module.css';


function SpecialCategorySliderSection({title = '', cHeight ="200px", classname="", data = {}, ...rest}) {

  const [slides, setSlides] = useState(data.section_content);
  
  useEffect(()=>{
    setSlides(data.section_content)
  }, [])

  return (
    <section className={styles.SpecialCategorySliderSection}>
        <h4 style={{marginBottom: "10px"}} className="text-black section-title">{title}</h4>
        <Swiper
            // slidesPerView={4}
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 2,
              },
            }}
            slidesPerGroup={3}
            // loop={true}
            loopFillGroupWithBlank={true}
            spaceBetween={5}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, FreeMode]}
            className={styles.swiperSpecial}
            style={{height: cHeight}}
        >
          {
            slides != null && slides.length > 0 && 
            slides.map((item, i)=>{
              return <SwiperSlide key={i} className={`${styles.item} ${classname}`} ><div style={{backgroundImage: `url(${item.image})`}}></div></SwiperSlide>
            })
          }
          </Swiper>
    </section>
  )
}

export default SpecialCategorySliderSection;