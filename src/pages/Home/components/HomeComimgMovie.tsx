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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if(visibleImages.length < 4){
        return 0
      }
      if((prevIndex + 1) % movieData.length === visibleImages.length + 3){
        return 0
      }        
      return (prevIndex + 1) % movieData.length
    }
  );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if(visibleImages.length < 4){
        return 0
      }
      if((prevIndex - 1 + movieData.length) % movieData.length === movieData.length - 1){
        return movieData.length - visibleImages.length - 2
      }
      return (prevIndex - 1 + movieData.length) % movieData.length
    }
  );
  };

  const filter = movieData.filter(item => item.status === 0)
  const visibleImages = filter.slice(currentImageIndex, currentImageIndex + 4);
  return (
    <div className="bg-main my-5">
      <div className="container ">
      <div className="row align-items-center pb-4">
        <div className="col-lg-6 d-flex ">
          <span className="d-block online-text fs-2 me-4">即將上映</span>
          <span className="d-block text-liner fs-2">COMING SOON</span>
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
          <img src="images/homePage/oArrowLeft.png" alt="Logo" className="online-arrow me-4" onClick={previousImage}/>
          <img src="images/homePage/oArrowRight.png" alt="Logo" className="online-arrow" onClick={nextImage}/>
        </div>
      </div>
      <div className="bg-line"></div>
      <div className="row row-cols-md-4 g-4">
        {/* --------------- */}
        {
          visibleImages?.map((item)=>{
            return (      
            <div key={item._id} className="col">
              <div className="card text-white bg-dark">
                <Link to={`/detail/${item._id}`}>
                  <img src={item.imgs[0]} className="img-fluid card-img-top  d-block h-389" />
                </Link>
                
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text d-flex justify-content-between align-items-center">
                    <span className="d-block">上映日期</span>
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