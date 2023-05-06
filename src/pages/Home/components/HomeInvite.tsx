import React from "react";

interface HomeInvite {}

export const HomeInvite: React.FC<HomeInvite> = () => {


  return (
    <div className="homeInvite">
      <h2 className="homeInvite-title">
        邀請好友一起看電影， 電影 77 折券一起拿！
      </h2>
      <ul className="homeInvite-card d-flex justify-content-between flex-column flex-md-row">
        <li className="d-flex flex-column align-items-center">
          <div
            className="homeInvite-card-img"
            style={{ backgroundImage: "url(/images/home/link-icon.png)" }}
          ></div>
          <p className="homeInvite-card-title">分享連結</p>
          <p className="homeInvite-card-subtitle">
            分享專屬連結，送好友 2 張 77 折券
          </p>
        </li>
        <li className="d-flex flex-column align-items-center">
          <div
            className="homeInvite-card-img"
            style={{ backgroundImage: "url(/images/home/ticket-icon.png)" }}
          ></div>
          <p className="homeInvite-card-title">好友註冊</p>
          <p className="homeInvite-card-subtitle">
            好友完成註冊，會員即可獲得 2 張 77 折券和會員點數 200 點
          </p>
        </li>
        <li className="d-flex flex-column align-items-center">
          <div
            className="homeInvite-card-img"
            style={{ backgroundImage: "url(/images/home/good-icon.png)" }}
          ></div>
          <p className="homeInvite-card-title">獲得優惠</p>
          <p className="homeInvite-card-subtitle">
            好友 2 個月內購票 2 張以上， 即可獲得 77 折券一張
          </p>
        </li>
      </ul>
    </div>
  );
};
