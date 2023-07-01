import React, { useState,useContext ,useEffect,  ChangeEvent, FormEvent } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { MovieContext } from '../../../store/movie'
import { Loading } from '../../../components';

// 首頁輪播大圖(目前寫死)
import carouselImg from "/images/carouselImg.png"
// 輪播圖左右箭頭
import LeftArrow from "/images/leftArrow.png"
import RightArrow from "/images/rightArrow.png"

const MovieBooking: React.FC = () => {
  const url = 'https://crazymovie.onrender.com'
  const MovieContextData = useContext(MovieContext);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [movieData, setMovieData] = useState<any[]>([])

  useEffect(()=>{
    setMovieData(MovieContextData)
    console.log(MovieContextData);    
  },[MovieContextData])

  const [movie, setMovie] = useState<string>('');
  const [screens, setScreens] = useState<any[]>([]);
  const [date, setDate] = useState<string>('');
  const [showtime, setShowtime] = useState<string>('');
  const [id, setId] = useState<any>(null);

  // const movies: string[] = ['Movie 1', 'Movie 2', 'Movie 3'];
  // const dates: string[] = ['2023-06-26', '2023-06-27', '2023-06-28'];
  // const showtimes: string[] = ['10:00', '14:00', '18:00'];

  const getData = async()=>{
    // const res = await axios.get(`http://127.0.0.1:3000/api/screens/${id}/playDate`);
    try {
      setloading(true)
      const res = await axios.get(`${url}/api/screens/${id}/playDate`);
      console.log(res.data.data); // 可以根據需要處理 API 回傳的資料
      setScreens(res.data.data)
      setloading(false)       
    } catch (error) {
      setloading(false)
    }
  }

  useEffect(()=>{
    
    getData() 
      
  },[id])

  const handleSubmit = (id:string) => {
    // e.preventDefault();
    console.log(id);
    
    navigate(`/ticknumber/${id}`);
  };

  const handleMovieChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const dataId = e.target.options[selectedIndex].getAttribute('data-key');
    setId(dataId);   
    setMovie(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDate(e.target.value);
  };

  const handleShowtimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShowtime(e.target.value);    
  };

  return (
    <> 
    <Loading isActive={loading} />     
    <div className='row justify-content-center m-40'>
      <div className='col-10 z-index-100 bg-dark-80'>
        <div className='row justify-content-between  p-4 gx-0 z-index-100'>
          {/* 選擇影片 */}
          <div className='col-12 col-md-3'>        
            <label className='d-flex align-items-center justify-content-between py-2 px-4 bd-gold'>
              {/* 選擇影片 */}
              <select value={movie} className='text-white bg-transparent' onChange={handleMovieChange}>
                <option value="" disabled>選擇影片</option>
                {/* {movies.map((m, index) => (
                  <option key={index} value={m}>
                    {m}
                  </option>
                ))} */}
                {movieData.map((m,index) => (
                  <option className='bg-dark' key={index} value={m.name} data-key={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <div className=''>
                <img src="/images/homePage/selectMovie.svg" alt="" className='d-block'/>
              </div>
            </label>
          </div>
          {/* 選擇影片 */}

          {/* 選擇日期 */}
          <div className='col-12 col-md-3'>        
            {/* {movie && ( */}
            {movie ? 
            (
              <label className='d-flex align-items-center justify-content-between py-2 px-4 bd-gold'>
                {/* 選擇日期 */}
                <select value={date} className='text-white bg-transparent' onChange={handleDateChange}>
                  <option value="" className='' disabled>選擇日期</option>
                  {screens.map((item, index) => (
                    <option className='bg-dark' key={item.screen._id} value={item.formattedDate}>
                      {item.formattedDate}
                    </option>
                  ))}
                </select>
                <div className=''>
                  <img src="/images/homePage/selectDate.svg" alt="" className='d-block'/>
                </div>
              </label>
            )
            : 
            (
              <label className='d-flex align-items-center justify-content-between py-2 px-4 bd-gold'>
                {/* 選擇日期 */}
                <select className='text-white bg-transparent text-white-50' value="請先選擇影片">
                  <option value="">請先選擇影片</option>
                </select>
                <div className=''>
                  <img src="/images/homePage/selectDate.svg" alt="" className='d-block'/>
                </div>
              </label>
            )
            }
          </div>
          {/* 選擇日期 */}    
              
          {/* 選擇場次 */}
          <div className='col-12 col-md-3'>        
            {/* {date && ( */}
            {date ? 
            (
              <label className='d-flex align-items-center justify-content-between py-2 px-4 bd-gold'>
                {/* 選擇場次 */}
                {/* 選擇場次 */}
                <select value={showtime} className='text-white bg-transparent' onChange={handleShowtimeChange}>
                  <option value="" className='' disabled>選擇場次</option>
                  {
                    screens.filter(item => item.formattedDate === date ).map(({screen}, index) => (
                      <option key={screen._id} className='bg-dark' value={new Date(screen.startDate).toISOString().split('T')[1].substr(0, 5)}>
                        {new Date(screen.startDate).toISOString().split('T')[1].substr(0, 5)}
                      </option>
                    ))
                  }
                </select>
                <div className=''>
                  <img src="/images/homePage/selectTime.svg" alt="" className='d-block'/>
                </div>
              </label>
            )
            : 
            (
              <label className='d-flex align-items-center justify-content-between py-2 px-4 bd-gold'>
                {/* 選擇場次 */}
                <select className='text-white bg-transparent text-white-50' value="請先選擇日期">
                  <option value="">請先選擇日期</option>
                </select>
                <div className=''>
                  <img src="/images/homePage/selectTime.svg" alt="" className='d-block'/>
                </div>
              </label>
            )
            }
          </div>
          {/* 選擇場次 */}     
            
          {/* {showtime &&  */}
          {showtime ?  
            (
              <div className="col-12 col-md-2">
                <button type="button" className='bg-gold text-dark border border-0 w-100 h-100 fw-bold' onClick={() => (handleSubmit(screens[0].screen._id)) }>
                  前往訂票
                </button>
              </div>
            )
            :
            (
              <div className="col-12 col-md-2">
                <button type="button" className='bg-gold text-dark-50 border border-0 w-100 h-100 fw-bold' disabled value="前往訂票">
                  前往訂票
                </button>
              </div>
            )
          }
        </div>
      </div>
    
    </div>
    </>
  );
}

export const HomeCarousel: React.FC = () => {
  return (
    <header className="container-fluid bg-main pb-80">
      
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-6 position-relative">  
          <img src="/images/homePage/carouselImg.png" className="d-block img-fluid"></img>
            {/* <img src="/images/homePage/leftArrow.png" alt="LeftArrow" className="z-index position-absolute top-50 start-0 translate-middle-y"/> */}
            <span className="text-liner fz-40 z-index position-absolute top-50 start-50 translate-middle">奢華沉浸，非凡感官</span>
            {/* <img src="/images/homePage/rightArrow.png" alt="RightArrow" className="z-index position-absolute top-50 end-0 translate-middle-y"/> */}
        </div>
      </div>
        <MovieBooking ></MovieBooking>

      {/* <div className='row justify-content-center'> */}
      {/* </div> */}
    </header>
  );
}