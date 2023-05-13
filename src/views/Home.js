import React, { Fragment, useEffect, useState } from "react";
import config from "../core/config";
import styles from "../styles/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Loader from "../components/Loader";
import axios from "axios";

import SpecialCategorySliderSection from "../components/home/SpecialCategorySliderSection";
import OverviewVideoSection from "../components/home/OverviewVideoSection";
import CategorySection from "../components/home/CategorySection";
import TrendingSection from "../components/home/TrendingSection";
import NewArrivalsSection from "../components/home/NewArrivalsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import PromoBannerSection from "../components/home/PromoBannerSection";
import NewsletterSection from "../components/home/NewsletterSection";
import DeliveryOverviewSection from "../components/home/DeliveryOverviewSection";
import HighlightSection from "../components/home/HighlightSection";
import { useSelector } from "react-redux";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [homeData, setHomeData] = useState([]);

  const fetchHomeData = async () => {
    setIsLoading(true);
    await axios
      .get(`${config.apiUrl_v1}/${config.apiRoutes.homePage}`)
      .then(({ data }) => {
        // console.log(data.data);
        setHomeData(data.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  console.log(homeData);

  if (isLoading) {
    return <Loader style={{ display: "none" }} />;
  }

  return (
    <Fragment>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {homeData[0].section_content &&
          homeData[0].section_content.map((item, i) => {
            return (
              <SwiperSlide key={i} className={styles.swiperItem}>
                <div style={{ backgroundImage: `url(${item.image})` }}></div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <section className={styles.section}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <SpecialCategorySliderSection
                cHeight="300px"
                title={homeData[1].section_title ?? ""}
                classname="w425"
                data={homeData[1]}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <div className='row no-gutters'>
            <div className='col-lg-6'><SpecialCategorySliderSection cHeight="240px" data={homeData[2]} title={homeData[2].section_title ?? ''} classname="w300" /></div>
            <div className='col-lg-6'><SpecialCategorySliderSection cHeight="240px" data={homeData[3]} title={homeData[3].section_title ?? ''} classname="w300" /></div>
        </div>
        <SpecialCategorySliderSection cHeight="240px" title={homeData[4].section_title ?? ''} data={homeData[4]} classname="w350" /> */}
      <section className={styles.section}>
        <HighlightSection data={homeData[0]} />
      </section>
      <section className={styles.section}>
        <CategorySection data={homeData[5]} />
      </section>
      <section className={styles.section}>
        <OverviewVideoSection data={homeData[6]} />
      </section>
      <TrendingSection data={homeData[7]} />
      <section
        className={styles.section}
        style={{ backgroundColor: "var(--light-gray-color)" }}
      >
        <NewArrivalsSection />
      </section>
      {/* <PromoBannerSection /> */}
      <NewsletterSection />
      {/* <TestimonialsSection /> */}
      <DeliveryOverviewSection />
    </Fragment>
  );
}

export default Home;
