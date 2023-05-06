import React from "react";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

interface HomeKvProps {
  children?: React.ReactNode;
}

export const HomeKv: React.FC<HomeKvProps> = ({ children }) => {
  return (
    <div className="homeKv">
      <Swiper
        className="homeKv-swiper"
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <picture>
            <source media="(max-width:375px)" srcSet="https://fakeimg.pl/375x480/?text=1" />
            <img src="https://fakeimg.pl/1920x640/?text=1"/>
          </picture>
        </SwiperSlide>
      </Swiper>
      {children}
    </div>
  );
};
