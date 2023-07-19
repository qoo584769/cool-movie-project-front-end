import React, { useContext,useState, useEffect,useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios';

const MovieDetailHeader = () => {
  return (
    <header className="container-fluid bg-main">      
      <div className="row">
        <div className="col-lg-12 col-md-6">  
          <img src="/images/homePage/detailImg.png" className="d-block img-fluid"></img>
        </div>
      </div>
    </header>
  );
};

const DetailInfo = () => {

  // const data = useContext(DataContext);
  const {id}= useParams();
  const [movieData, setMovieData] = useState<any[]>([]);
  const [movieTimeData, setMovieTimeData] = useState([]);
  
  // const selectTimeButton = () => {
    const navigate = useNavigate();
  
    const handleClick = (id: any) => {
      // 在此處設定要跳轉的路徑
      navigate(`/ticknumber/${id}`);
  }
  // };
  
  const apiData = async ()=>{
    const res = await axios.get(`http://127.0.0.1:3000/api/screens/${id}/playDate`)
    console.log(res.data.data);
      setMovieData(res.data.data);  
    // -----------------
    const movieRes = await axios.get(`http://127.0.0.1:3000/api/screens?movieId=${id}&&type=${movieData[0]?.screen.type}&&startDate=${movieData[0]?.screen.startDate}&&name=${movieData[0]?.screen.movieId.name}`)
    console.log('movieData',movieRes);
    
  }
  
  useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
  //   axios.get(`http://127.0.0.1:3000/api/screens/${id}/playDate`)
  //     .then(res => {
  //       setMovieData(res);
  //       console.log(res)
  // console.log(movieData);
        
  //     })
  //     .catch(error => console.log(error));
    (async()=>{
      const url = 'https://crazymovie.onrender.com'
      // const res = await axios.get(`http://127.0.0.1:3000/api/screens/${id}/playDate`)
      const res = await axios.get(`${url}/api/screens/${id}/playDate`)
    console.log(res.data.data);
      setMovieData(res.data.data);
    //   const movieRes =  await axios.get(`http://127.0.0.1:3000/api/screens?movieId=${id}&type=${movieData[0]?.screen.type}&startDate=${movieData[0]?.screen.startDate}&name=${movieData[0]?.screen.movieId.name}`)
    // console.log('movieData',movieRes);
    //   console.log('movieData',movieRes);
    })();
    // apiData();
    
  }, []);
  
  return (
    <>
      {/* {movieData.map((item,index)=>{
        return (<div key="item.screen._id">{item.formattedDate}</div>)
      })} */}
      <div className="container position-relative">   
        <div className="row position-absolu position-80">
          <div className="col-md-4 mb-3">
            <div className="card bg-dark">
              <img src={movieData[0]?.screen.movieId.imgs[0]} className="card-img-top" alt="Image 1" />
              <div className="card-body px-0 pb-0 text-white">
                <h5 className="card-title d-flex justify-content-between">
                  <span className="">上映日期:</span>
                  {
                    movieData[0]?<span className="">{new Date(movieData[0]?.screen.movieId.releaseData).toISOString().split('T')[0]}</span>:<span className="">{movieData[0]?.screen.movieId.releaseData}</span>
                  }
                  {/* <span className="">{new Date(movieData[0]?.screen.movieId.releaseData).toISOString().split('T')[0]}</span> */}
                  {/* <span className="">{movieData[0]?.screen.movieId.releaseData}</span> */}
                </h5>
                <h5 className="card-title d-flex justify-content-between">
                  <span className="">導演:</span>
                  <span className="">{movieData[0]?.screen.movieId.director}</span>
                </h5>
                <h5 className="card-title d-flex justify-content-between">
                  <span className="w-50">演員:</span>
                  <span className="text-end">柴克萊威、海倫米蘭、瑞秋曾格勒、亞當布洛迪</span>
                </h5>
                <p className="card-text p-4">{movieData[0]?.screen.movieId.desc}</p>
              </div>
            </div>
          </div>
    
          <div className="col-md-8">
            <div className="">
              <div className="text-gold">熱映中 NOW SHOWING</div>
              <div className="text-white mt-4">{movieData[0]?.screen.movieId.name}</div>
              <div className="mt-4">
                <span className="border border-1 text-white p-2 me-3">普</span>
                <span className="border border-1 text-white p-2">{movieData[0]?.screen.movieId.time}分</span>
              </div>
            </div>
        
            <div className="d-flex justify-content-between pt-160">
              <div className="">
                線上訂票
              </div>
              {/* <div className="">
                <a href="#" className="">XL 100 席皇家廳</a>
                <a href="#" className="">L 50 席豪華廳</a>
              </div> */}
            </div>
            <div className="bg-liner my-4"></div>
            <ul className="list-group list-group-flush">

              {movieData.map((item,index)=>{
                 return (
                   <li key={item.screen._id} className="list-group-item bg-main boder border-0 text-white mb-4 ps-0">
                   {/* <div key="item.screen._id">{item.formattedDate}</div> */}
                   <div className="mb-3">{item.formattedDate}</div>
                  <div className="">
                  <button type="button" className="btn btn-outline-warning me-3" onClick={()=>handleClick(item.screen._id)}>{new Date(item.screen.startDate).toISOString().split('T')[1].substr(0, 5)}</button>
                  </div>
                   </li>
                 )
              })}
              
              {/* <li className="list-group-item">
                <div className="">3/19 (日)</div>
                <div className="">
                  <button type="button" className="btn btn-outline-warning me-3">14:00</button>
                  <button type="button" className="btn btn-outline-warning me-3">16:00</button>
                  <button type="button" className="btn btn-outline-warning me-3">19:00</button>
                </div>
              </li>   */}
            </ul>
            {/* <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="">3/20 (一)</div>
                <div className="">
                  <button type="button" className="btn btn-outline-warning me-3">14:00</button>
                </div>
              </li>  
            </ul> */}
          </div>
        </div>
      </div>
    </>
 );
}

export const MovieDetail = () => {
  return (
   <>
    {/* <GetData> */}
    <MovieDetailHeader />
    <DetailInfo />
    {/* </GetData> */}
   </>
  );
};