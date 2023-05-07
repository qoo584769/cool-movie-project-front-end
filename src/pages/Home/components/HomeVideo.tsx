import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css/pagination";
SwiperCore.use([Pagination]);

interface HomeVideo {}

export const HomeVideo: React.FC<HomeVideo> = () => {
  const pagination = {
    clickable: true,
    bulletClass: "homeVideo-pagination-bullet",
    bulletActiveClass: "homeVideo-pagination-bullet-active",
  };
  return (
    <div className="homeVideo">
      <Swiper
        className="homeKv-swiper"
        slidesPerView={1}
        pagination={pagination}
      >
        <SwiperSlide>
          <div className="homeVideo-content d-flex align-items-center flex-column flex-md-row">
            <div
              role="button"
              className="homeVideo-img position-relative"
              style={{
                backgroundImage: "url(https://fakeimg.pl/712x400/?text=1)",
              }}
            >
              <div className="homeVideo-img-play position-absolute top-50 start-50 translate-middle">
                <img src="/images/home/play-icon.png" />
              </div>
            </div>
            <div className="homeVideo-desc">
              <h3>捍衛任務4</h3>
              <p>
                《捍衛任務系列》原班人馬打造最新史詩篇章，
                「葉問」對決「殺神」!香港動作男星[甄子丹]正式參戰，
                與[基努李維]展開大銀幕對決。
              </p>
              <div className="homeVideo-buttons d-flex no-wrap">
                <button className="homeVideo-buttons-movie me-4">
                  電影簡介
                </button>
                <button className="homeVideo-buttons-order">前往訂票</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="homeVideo-content d-flex align-items-center flex-column flex-md-row">
            <div
              role="button"
              className="homeVideo-img position-relative"
              style={{
                backgroundImage: "url(https://fakeimg.pl/712x400/?text=1)",
              }}
            >
              <div className="homeVideo-img-play position-absolute top-50 start-50 translate-middle">
                <img src="/images/home/play-icon.png" />
              </div>
            </div>
            <div className="homeVideo-desc">
              <h3>捍衛任務4</h3>
              <p>
                《捍衛任務系列》原班人馬打造最新史詩篇章，
                「葉問」對決「殺神」!香港動作男星[甄子丹]正式參戰，
                與[基努李維]展開大銀幕對決。
              </p>
              <div className="homeVideo-buttons d-flex no-wrap">
                <button className="homeVideo-buttons-movie me-4">
                  電影簡介
                </button>
                <button className="homeVideo-buttons-order">前往訂票</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="homeVideo-content d-flex align-items-center flex-column flex-md-row">
            <div
              role="button"
              className="homeVideo-img position-relative"
              style={{
                backgroundImage: "url(https://fakeimg.pl/712x400/?text=1)",
              }}
            >
              <div className="homeVideo-img-play position-absolute top-50 start-50 translate-middle">
                <img src="/images/home/play-icon.png" />
              </div>
            </div>
            <div className="homeVideo-desc">
              <h3>捍衛任務4</h3>
              <p>
                《捍衛任務系列》原班人馬打造最新史詩篇章，
                「葉問」對決「殺神」!香港動作男星[甄子丹]正式參戰，
                與[基努李維]展開大銀幕對決。
              </p>
              <div className="homeVideo-buttons d-flex no-wrap">
                <button className="homeVideo-buttons-movie me-4">
                  電影簡介
                </button>
                <button className="homeVideo-buttons-order">前往訂票</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
