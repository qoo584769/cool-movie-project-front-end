import React, { useState, useEffect } from "react";
import { Loading } from "../../components";
import { HomeKv } from "./components/HomeKv";
import { HomeOrderForm } from "./components/HomeOrderForm";
import { HomeShowing } from "./components/HomeShowing";
import { HomeMovieCard } from "./components/HomeMovieCard";
import { HomeVideo } from "./components/HomeVideo";
import { HomeDiscount } from "./components/HomeDiscount";
import { HomeInvite } from "./components/HomeInvite";

import { Swiper, SwiperSlide } from "swiper/react";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="home">
      <Loading isActive={loading} />
      <HomeKv>
        <HomeOrderForm></HomeOrderForm>
      </HomeKv>
      <div className="container">
        <HomeShowing isShowing={true}>
          <div className="d-flex overflow-hidden">
            <Swiper
              slidesPerView={"auto"}
              loop={true}
              spaceBetween={24}
              centeredSlides={true}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <HomeMovieCard isShowing={true}></HomeMovieCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </HomeShowing>
        <HomeShowing isShowing={false}>
          <div className="d-flex overflow-hidden">
            <Swiper
              slidesPerView={"auto"} 
              loop={true}
              spaceBetween={24}
              centeredSlides={true}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <HomeMovieCard></HomeMovieCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </HomeShowing>
        <HomeVideo></HomeVideo>
      </div>
      <HomeDiscount></HomeDiscount>
      <div className="container">
        <HomeInvite></HomeInvite>
      </div>
    </div>
  );
};
