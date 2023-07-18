import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { MovieContext } from '../../../store/movie'
import axios from 'axios';

// 輪播圖左右箭頭
import oArrowLeft from "/images/homePageft.png"
import oArrowRight from "/images/homePageght.png"

export const HomeComimgMovie = () => {

  const data = useContext(MovieContext);
  const [movieData, setMovieData] = useState<any[]>([])
  useEffect(()=>{
    setMovieData(data)
  },[data])
  // useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
  //   (async()=>{
  //     await axios.get('http://127.0.0.1:3000/api/movie')
  //     .then(res => {
  //       setMovieData(res.data.data.data)
  //     })
  //     .catch(error => console.log(error));
  //   })();
  // }, []);
  // ---------------------
  // ---------------------

  return (
    <div className="bg-main">
      <div className="container ">
      <div className="row align-items-center pb-4">
        <div className="col-lg-6 d-flex ">
          <span className="d-block online-text fs-2 me-4">即將上映</span>
          <span className="d-block text-liner fs-2">COMING SOON</span>
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
          <img src="images/homePage/oArrowLeft.png" alt="Logo" className="online-arrow me-4"/>
          <img src="images/homePage/oArrowRight.png" alt="Logo" className="online-arrow"/>
        </div>
      </div>
      <div className="bg-line"></div>
      <div className="row row-cols-md-4 g-4">
        {/* --------------- */}
        {
          movieData.map((item)=>{
            return (      
            <div key={item._id} className="col">
              <div className="card text-white bg-dark">
                <Link to={`/detail/${item._id}`}>
                  <img src={item.imgs[0]} className="img-fluid card-img-top" alt="Image 1" />
                </Link>
                
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text d-flex justify-content-between align-items-center">
                    <span className="d-block">上映日期</span>
                    {/* <span className="d-block">{item.releaseData}</span> */}
                    <span className="d-block">{new Date(item.releaseData).toISOString().split('T')[0]}</span>
                  </p>
                </div>
              </div>
            </div> 
            )
          })
        }
        {/* --------------- */}        
      </div>
    </div>
    </div>
  );
}