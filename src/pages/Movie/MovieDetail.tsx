import React, { useContext,useState, useEffect,useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import { Loading } from "../../components";
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
  const [isLoading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState<any[]>([]);
  const [indexArr, setIndexArr] = useState<any[]>([]);
  const [movieTimeData, setMovieTimeData] = useState([]);
  
    const navigate = useNavigate();
  
    const handleClick = (id: any) => {
      // 在此處設定要跳轉的路徑
      navigate(`/ticknumber/${id}`);
  }  
  
  useEffect(() => {
    setLoading(true);
    (async()=>{
      const url = process.env.REACT_APP_REMOTE_URL
      const res = await axios.get(`${url}/api/screens/${id}/playDate`)
      setMovieData(res.data.data);
      setLoading(false);
    })();    
  }, []);

  useEffect(()=>{
    const filterData = movieData.sort((a:any, b:any) => a.screen.startDate.localeCompare(b.screen.startDate, 'zh-TW'))

    const indexArray:any[] = []
    filterData.forEach((item:any, index:any, arr:any) => {
      if (index === 0) {
        indexArray.push(index)
      } else if (new Date(item.screen.startDate).toISOString().split('T')[0] !== new Date(arr[index - 1].screen.startDate).toISOString().split('T')[0]) {
        indexArray.push(index)
      }
    })
    setIndexArr(indexArray)    
  },[movieData])

  return (
    <>
      <Loading isActive={isLoading}></Loading>
      <div className="container position-relative">   
        <div className="row position-absolu position-80">
          <div className="col-md-4 mb-3">
            <div className="card bg-dark">
              <img src={movieData[0]?.screen.movieId.imgs[0]} className="card-img-top" alt="Image 1" />
              <div className="card-body px-0 pb-0 text-white">
                <h5 className="card-title d-flex justify-content-between px-4">
                  <span className="">上映日期:</span>
                  {
                    movieData[0]?<span className="">{new Date(movieData[0]?.screen.movieId.releaseData).toISOString().split('T')[0]}</span>:<span className="">{movieData[0]?.screen.movieId.releaseData}</span>
                  }
                </h5>
                <h5 className="card-title d-flex justify-content-between px-4">
                  <span className="">導演:</span>
                  <span className="">{movieData[0]?.screen.movieId.director}</span>
                </h5>
                <h5 className="card-title d-flex justify-content-between px-4">
                  <span className="w-100">演員:</span>
                  <span className="">{movieData[0]?.screen.movieId.actors.join(',')}</span>
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
            </div>
            <div className="bg-liner my-4"></div>
            <ul className="list-group list-group-flush flex-row row">
              {movieData.map((item,index)=>{
                 return (
                  <>
                   <li key={item.screen._id} className="list-group-item bg-main boder border-0 text-white mb-4 col-4 col-md-2">
                    <div className={`mb-3 ${indexArr.includes(index)? 'visable' :'invisible'}`}>
                      {new Date(item.screen.startDate).toISOString().split('T')[0]}
                    </div>
                    <div className="">
                      <button 
                        type="button" 
                        className="btn btn-outline-warning me-3" 
                        onClick={()=>handleClick(item.screen._id)}>
                        {new Date(item.screen.startDate).toISOString().split('T')[1].substr(0, 5)}
                      </button>
                    </div>
                   </li>
                   <div className={`${index===0} || ${indexArr.includes(index+1) ? 'w-100' : 'd-none'}`}></div>
                  </>
                 )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
 );
}

export const MovieDetail = () => {
  return (
   <>
    <MovieDetailHeader />
    <DetailInfo />
   </>
  );
};