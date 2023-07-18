import React from 'react';
import fb from "../asset/img/fb.png"
import ig from "../asset/img/ig.png"

function FooterBlock() {
  return (
    <footer style={{ backgroundColor: '#393A3A', padding: '1rem' }}>
      <div className="container">
        <div className="row">
          {/* 左側欄位 */}
          <div className="col-sm-12 col-md-6">
            <p className="">
              <img src="/public/images/homePage/Logo.svg" alt="Logo" />
            </p>
            <p className="">
              <a href="#" className="">聯絡我們</a>
              <a href="#" className="">常見問題</a>
              <a href="#" className="">隱私權公告</a>
            </p>
            <p className="">
              <a href="#" className=""><img src="/public/images/homePage/fb.png" alt="fb" /></a>
              <a href="#" className=""><img src="/public/images/homePage/ig.png" alt="ig" /></a>
            </p>
          </div>

          {/* 右側欄位 */}
          <div className="col-sm-12 col-md-6">
            <p className="text-white">爽影票影城</p>
            <p className="text-white-50">02-8502-2208</p>
            <p className="text-white-50">台北市市民大道 22 號 6 樓</p>
            <p className="text-white-50">6F, No.22, Jingye 3rd Rd., Zhongshan Dist.,Taipei City 104, Taiwan (R.O.C.)</p>
          </div>
        </div>
      </div>      
    </footer>
  );
}

export const Footer = () => {
  return (
    <>
      <FooterBlock></FooterBlock>
    </>
  );
};
