import React from "react";

interface HomeMovieCard {
  isShowing?: boolean;
}

export const HomeMovieCard: React.FC<HomeMovieCard> = ({ isShowing }) => {
  return (
    <div
      className={`homeMovieCard general ${isShowing && "homeMovieCard-showing"}`}
    >
      {isShowing && <button className="homeMovieCard-order">線上訂票</button>}
      <div className="homeMovieCard-img overflow-hidden">
        <img src="https://fakeimg.pl/306x438/?text=1" />
      </div>
      <div className="homeMovieCard-content">
        <p className="homeMovieCard-title">沙贊!眾神之怒</p>
        <p className="homeMovieCard-time d-flex justify-content-between align-items-center">
          <span>上映日期:</span>
          <span>2023/03/18</span>
        </p>
      </div>
    </div>
  );
};
