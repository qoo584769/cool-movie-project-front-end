import React from "react";

interface HomeDiscount {}

export const HomeDiscount: React.FC<HomeDiscount> = () => {
  return (
    <div
      className="homeDiscount"
      style={{ backgroundImage: "url(/images/home/discount-bg.png)" }}
    >
      <div className="container d-flex justify-content-between align-items-center flex-column flex-lg-row h-100">
        <div className="homeDiscount-desc"  style={{ backgroundImage: "url(/images/home/discount-bg.png)" }}>
          <h2>電影之夜套餐優惠</h2>
          <p>
            和另一半一起來全台最豪華影城看電影，享情侶套餐超划算！ 包括 2
            張電影票、2 份私廚料理 套餐和調酒，原價 1230 元，現在只需 999 元。
          </p>
        </div>
        <div className="homeDiscount-img">
          <img src="/images/home/discount-pic.png" />
        </div>
      </div>
    </div>
  );
};
