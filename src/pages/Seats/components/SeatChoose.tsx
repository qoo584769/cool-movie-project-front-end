import React, { useContext,useState, useEffect,useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { OrderContext } from '../../../store';
import { loginContext,isLoginContext } from '../../../store/isLogin';
import {Login} from '../../../components/Login';
import { authFetch, logoutClear, getCookie } from '../../../utilities';
import axios from 'axios';

interface SeatInfoProps {

}

export const SeatInfo: React.FC<SeatInfoProps> = ({ }) => {
  const [state, dispatch] = useContext(OrderContext);
	const [loginState, loginDispatch] = useContext(isLoginContext);
  const loginStates:{setIsLogin?:any,isLogin?:any} = useContext(loginContext)
  const navigate = useNavigate();
  const {id, tickNumber}= useParams();
  const token = (localStorage.getItem("userToken")) ? localStorage.getItem("userToken") : null
  // const [isLogin, setIsLogin] = useState(false)
  const [seatPage, setSeatPage] = useState<any>(false);
  let [orderData, setOrderData] = useState({})
  const [seatSelectData, setSeatSelectData] = useState([])
  const [movieData, setMovieData] = useState({
    _id:'',
    movieId:{name:''},
    seatsStatus:[{ seat_id: "", is_booked: false }],
    startDate:'',
    theaterId:{}
  });
  const [tickets, setTickets] = useState([
    // { type: "", price: 0, quantity: 0 },
    { ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)", price: 980, quantity: 1 },
  ]);
  const [event, setEvent] = useState<SelectEvent>({
    date: ``,
    // date: `2020-10-10`,
    time: ``,
    // time: `14:00`,
    movieTitle:``,
    // movieTitle:`玲芽之旅`,  
    // ticketPrice: 220,
    ticketPrice: 0,
    handlingFee: 20,
  })
  
  // 測試選單按鈕
  const [checkedState, setCheckedState] = useState(
    new Array(130).fill(false)
  );
   const handleOnChange = (position : any) => {
     const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  // 測試選單按鈕
  
  interface SelectEvent {
    date: string;
    time: string;
    movieTitle: string;
    ticketPrice: number;
    handlingFee: number;
  }

  useEffect(() => {       
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
      const url = process.env.REACT_APP_REMOTE_URL
      const res = await axios.get(`${url}/api/screens/${id}`)
      const ticketData = [{
        ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)",
        price: parseInt(`${res.data.data.theaterId.price+500+150}`),
        quantity: parseInt(`${tickNumber}`)
      }];
      setTickets(ticketData);
      setMovieData(res.data.data);
      setEvent({
        date: `${new Date(res.data.data?.startDate).toISOString().split('T')[0]}`,
        time: `${new Date(res.data.data?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
        movieTitle:`${res.data.data?.movieId.name}`,
        ticketPrice: parseInt(`${ticketData[0].price * ticketData[0].quantity}`),
        handlingFee: 20,
      })      
    })();    
  }, []);
  // --------------------------
  useEffect(() => {
    const rememberMe = getCookie("remember_me");
    if (token) {
      const tokenExpTime = JSON.parse(atob(token?.split(".")[1] || "")).exp;
      const userId = JSON.parse(atob(token?.split(".")[1] || "")).id
      const currentTime = Math.floor(Date.now() / 1000);

      // 如果原本的token沒過期，則繼續向後端拿資料
      if (rememberMe && tokenExpTime > currentTime) {
        (async function () {
          try {
            let response = await authFetch.get('/api/member/getUser')
            const userName = response.data.data.nickName

            dispatch({
              type: "ADD_MEMBER_DATA",
              payload: {
                memberId: userId,
                memberName: userName,
                status: "member"
              }
            })
            loginDispatch({
              type:"YES",
              value:true
            })
            
          } catch (error) {
            console.log('error', error);
          }
          loginStates.setIsLogin(true)
        }())
      } else {
        logoutClear(dispatch)
        loginStates.setIsLogin(false)
      }
    } else {
      logoutClear(dispatch)
      loginStates.setIsLogin(false)
    }
  }, [dispatch])
  // -----------------------
  useEffect(() => {
    if(loginStates.isLogin && seatPage){
      setSeatPage(false)
    }
  },[loginStates.isLogin])
  // --------------------------

  const [pos, setPos] = useState<any>([])
  const [unoccupied, setUnoccupied] = useState(0)
  const seatBtn=(seatItem:any ={},movieData:any ={},position:any)=>{
    if(unoccupied < (tickNumber ? parseInt(tickNumber) : 0)){    
      const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      )
      const unoccupiedSeat = updatedCheckedState.filter(item=>item === true).length
      setUnoccupied(unoccupiedSeat)
      setCheckedState(updatedCheckedState);
      setPos((pre: any)=>{
        const index = pre.findIndex((item:any)=>item === seatItem.seat_id)
        if(index !== -1){
          pre.splice(index,1)
          setSeatSelectData(checkedState[position]?'尚未選擇位置': pre)
          return [...pre]
        }
        pre = [...pre,seatItem.seat_id]
        setSeatSelectData(checkedState[position]?'尚未選擇位置': pre)
        return pre
      })
      // setSeatSelectData(checkedState[position]?'尚未選擇位置':seatItem.seat_id)
      console.log(checkedState)
    }
    else{
      const updatedCheckedState = checkedState.map((item, index) =>
        {
          if(item.toString() === 'true'){
            return index === position ? !item : item
        }
        return item
        }
      )
      const unoccupiedSeat = updatedCheckedState.filter(item=>item === true).length
      setUnoccupied(unoccupiedSeat)
      setCheckedState(updatedCheckedState);
      setPos((pre: any)=>{
        const index = pre.findIndex((item:any)=>item === seatItem.seat_id)        
        if(index !== -1){
          pre.splice(index,1)
          setSeatSelectData(checkedState[position]?'尚未選擇位置': pre)
          return [...pre]
        }
        return pre
      })      
    }
  }
  
  const payBtn = (movieData:any,time:any,totalPrice:any)=>{
    const data = {
      ItemDesc:movieData.movieId.name, 
      date:`${new Date(movieData?.startDate).toISOString().split('T')[0]}`, position:seatSelectData,
      price:totalPrice, 
      time,
      screenId:`${id}`
    }
			if(token !== null){
				loginStates.setIsLogin(true)
			}
			if( loginStates.isLogin ){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("userToken")}`
    const url = process.env.REACT_APP_REMOTE_URL
    const res = axios.post(`${url}/api/order/createOrder`,data).then(res=>{
      setOrderData = res.data.data;
      navigate(`/order/${res.data.data._id}`);
    })
    }
			else{
				setSeatPage(true)
			}
  }

  const handleBackClick = (id: any) => {
    // 在此處設定要跳轉的路徑
    navigate(`/ticknumber/${id}`);
  }

  // 票券頁面右邊的顯示選擇資訊
  // ------------------------------------
  function SelectedEvent( {selectEvent}:{ selectEvent: SelectEvent } ) {
    const { date, time, movieTitle, ticketPrice, handlingFee } = selectEvent;
  
    const total = ticketPrice + handlingFee;
  
    return (
      <div className="container bd-gold">
        {/* Title */}
        <div className="title">剩餘 {tickNumber ? parseInt(tickNumber) - unoccupied : 0 } 個位置尚未選擇</div>
        <div className="title">您選定的位置 {seatSelectData ? pos.join(','):'尚未選位置'}</div>
        <div className="bg-gold my-4" style={{ height: "2px"}}></div>
        {/* Date and Time and Movie */}
        <div className="row ">
          <div className='col-4'>日期：</div>
          <span className='col-8 text-end'>{date}</span>
          <div className='col-4'>時間：</div>
          <span className='col-8 text-end'>{time}</span>
      		<span className='col-4'>電影：</span>   
        	<span className='col-8 text-end'>{movieTitle}</span>    
        </div>  
        
        <div className="bg-gold my-4" style={{ height: "2px"}}></div>
        {/* Ticket Price */} 
      	<div className='row'>
          	<span className='col-4'>票券金額：</span>  
            <span className='col-8 text-end'>{ticketPrice} 元</span>
            <span className='col-4'>手續費：</span>   
        	  <span className='col-8 text-end'>{handlingFee}</span>  
            <span className='col-4' style={{ fontSize: "16px", color: "#fff" }}>總計：</span>   
        	  <span className='col-8 text-end'>{total}</span>  
         </div>

         <div className="row my-4">  
           <div className="col-6">
             <button type="button" className="w-100 btn btn-outline-warning" onClick={()=>handleBackClick(id)}>
               重選數量
             </button>
           </div>
           <div className="col-6">
        	   <button type="button" className="w-100 btn btn-warning" onClick={()=>payBtn(movieData, time, total)}>
           	 前往訂位
           	</button>
             <div className="position-absolute" style={{top: "-100000px"}}>
                <Login isLogin={loginStates.isLogin} setIsLogin={loginStates.setIsLogin} setSeatPage={setSeatPage} seatPage={seatPage}></Login>
              </div>
           </div>
        </div>        
      </div>
      )
  }
  // ------------------------------------

  // 座位表
  // ------------------------------------
  function Seat(props:any) {
    const seatClass = props.isTaken ? "seat taken" : "seat available";
    return (
      <span className="">
        <div className="d-inline-block checkbox-circle">
          <input
            type="checkbox"
            id={`custom-checkbox-${props.ckeckId}`}
            className={seatClass}
            checked={checkedState[props.ckeckId]}     
            disabled={props.isTaken}
            onChange={() => seatBtn(props.seatData, movieData, props.ckeckId)}
          />
        </div>
      </span>
    );
  }

  function SeatRow(props:any) {
    const seats = [];
    for (let i = props.rowStart; i <= props.rowEnd; i++) {
      seats.push(
        <Seat key={i} seatNumber={i} isTaken={props.takenSeats.includes(i)} movieData = {movieData} seatData={props.rowNum?.seatsStatus[i-1]} ckeckId={i}/>
      );
    }
  
    return (
      <div className="row mb-3">
      	<div className="col-1 text-center font-weight-bold">{props.rowName}</div>
      	<div className="col-10 ofset-1 d-flex justify-content-between">
          	{seats}
        </div>
  	  </div>
    );
  }
  // ------------------------------------

  // 座位表預設
  // ------------------------------------
  // 假設已有被預定的位置
   const takenSeats = movieData.seatsStatus.map((item,ind) => {
    if(item.is_booked){
      return ind + 1
    }
   });

   // 計算每排開始、結束的位置及該排是否需要留空
   const rowsConfig = [
     { name: 'A', start:1, end:10 },
     { name: 'B', start:11, end:20 },
     { name: 'C', start:21, end:30 },
     { name: 'D', start:31, end:40 },
     { name: 'E', start:41, end:50 },
     { name: 'F', start:51, end:60 },
     { name: 'G', start:61, end:70 },
     { name: 'H', start:71, end:80 },
     { name: 'I', start:81, end:90 },
     { name: 'J', start:91, end:100 },
     { name: 'K', start:101, end:110 },
     { name: 'L', start:111, end:120 },
     { name: 'M', start:121, end:130 }
   ];

	const rows = rowsConfig.map((rowConfig,index) => {
       if (!rowConfig) {
           return null;
       }

       const rowStart = rowConfig.start;
       const rowEnd = rowConfig.end;
       const rowName = rowConfig.name;

       return (
         <SeatRow key={index} 
                  takenSeats={takenSeats}
                  rowStart={rowStart}
                  rowEnd={rowEnd}
                  rowName={rowName}
                  rowNum={movieData}
           />
      );
   });
  // ------------------------------------
  
  
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-12">重新選票</div>
      </div>
      
      <div className="row mt-3">
        <div className="col-12">
          <div className="">
            1.選擇座位
          </div>
          <div className="">            
          </div>
        </div>
        <div className="col-12">請選擇欲購買的座位,如需重新選擇座位,請將原選擇的座位點擊後變回空位顏色即可。</div>
      </div>

      <div className="row mt-5">
        {/* 選擇數量 */}
        <div className="col-12 col-md-8 ckeckbox">

          <div className="row mb-3 ">
            <div className="col-1"></div>
            <div className="col-10 ofset-1 d-flex justify-content-between">
                {[...Array(10)].map((_, i) => ( /* 建立1~10的陣列 */
                  <span key={i} className="text-center seat">{i+1}</span>
                ))}
            </div>
          </div>
          {rows}
        </div>
        {/* 選擇數量結束 */}
        <div className="col-12 col-md-4">
          <SelectedEvent selectEvent={event}></SelectedEvent>
          {/* 注意事項 */}
          <div className="">
            {/* <div className="">
              注意事項
            </div> */}

            {/* <ul className="">
              <li className="list-disc">若須取消訂票，請於該場次開演前 40 分鐘登入至訂票查詢取消。</li>
              <li className="list-disc">訂票完成並以信用卡付款成功，等同已購買,請確認所選場次與影城無誤，如訂錯影城、影、時間，已過場次而未取票者，由觀眾自行負擔，此筆費用恕不退還。</li>
            </ul> */}
          </div>
        </div>
      </div>

    </div>    

  );
}