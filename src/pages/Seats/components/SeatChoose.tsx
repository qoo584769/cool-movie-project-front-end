import React, { useContext,useState, useEffect,useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

interface SeatInfoProps {

}

export const SeatInfo: React.FC<SeatInfoProps> = ({ }) => {
  
  const navigate = useNavigate();
  const {id}= useParams();

  let [orderData, setOrderData] = useState({})
  let [payData, setPayData] = useState({
    Amt:'',
    Email:'',
    Name:''
  })
  let [newebpayData,setNewebpayData] = useState({
    TimeStamp:'',
    MerchantOrderNo:'',
    TradeSha:'',
    TradeInfo : '',
    ItemDesc : '',
    MerchantID : 'MS148574761',
    Version : '1.5'
  })
  
  const [seatSelectData, setSeatSelectData] = useState('')
  const [movieData, setMovieData] = useState(undefined);
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
      const url = 'https://crazymovie.onrender.com'
    console.log(id)
      // const res = await axios.get(`http://127.0.0.1:3000/api/screens/${id}`)
      const res = await axios.get(`${url}/api/screens/${id}`)
    console.log(res.data.data);
    // console.log(res);
      // setMovieData(res.data.data);
      const ticketData = {
        ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)",
        price: parseInt(`${res.data.data.theaterId.price+500+150}`),
        quantity: 1
      };
      setMovieData(res.data.data);
      setTickets([ticketData]);
      setEvent({
        date: `${new Date(res.data.data?.startDate).toISOString().split('T')[0]}`,
        time: `${new Date(res.data.data?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
        movieTitle:`${res.data.data?.movieId.name}`,
        ticketPrice: parseInt(`${tickets[0].price}`),
        handlingFee: 20,
      })
    })();
    
  }, []);

  const seatBtn=(seatItem:any ={},movieData:any ={},position:any)=>{
    // setSeatSelectData(seatItem.seat_id)
    // console.log("seatitem",item)
    // console.log("movieData",movieData)
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState);
    setSeatSelectData(checkedState[position]?'尚未選擇位置':seatItem.seat_id)
    console.log(checkedState)
  }

  const btnPay = (data:any)=>{
    const url = 'https://crazymovie.onrender.com'
        // axios.post('http://127.0.0.1:3000/api/newebpay/createOrder',data).then(res=>{
        axios.post(`${url}/api/newebpay/createOrder`,data).then(res=>{
      console.log(res);
          setNewebpayData({
            TimeStamp : res.data.data.order.TimeStamp,
            MerchantOrderNo : res.data.data.order.MerchantOrderNo,
            TradeSha : res.data.data.sha,
            TradeInfo : res.data.data.aes,
            ItemDesc : res.data.data.order.Name,
            MerchantID : 'MS148574761',
            Version : '1.5'
          })
    }).catch(e=>{
      console.log(e);
    })
  }
  
  const payBtn = (movieData:any)=>{
    const data = {ItemDesc:movieData.movieId.name,date:`${new Date(movieData?.startDate).toISOString().split('T')[0]}`,position:seatSelectData,price:movieData.theaterId.price,time:event.time}
    // console.log(data)
    // console.log(movieData)
    const url = 'https://crazymovie.onrender.com'
    // const res = axios.post(`http://127.0.0.1:3000/api/order/createOrder`,data).then(res=>{
    const res = axios.post(`${url}/api/order/createOrder`,data).then(res=>{
      console.log(res)
      // setOrderData = res.data.data;
      navigate(`/order/${res.data.data._id}`);
      return res.data.data;
    }).then(res=>{      
      // console.log(res);
      // setOrderData(res);
      // console.log(orderData.price)
      // setPayData({
      //   Amt:orderData.price,
      //   Email:'uh584697213@gmail.com',
      //   ItemDesc:orderData.ItemDesc
      // });      
    })

    // ------------------------
    // const newPayData = {
    //   Amt:payData.value.Amt,
    //   Email:payData.value.Email,
    //   ItemDesc:payData.value.Name
    // }
  }
  // 票券頁面右邊的顯示選擇資訊
  // ------------------------------------
  function SelectedEvent( {selectEvent}:{ selectEvent: SelectEvent } ) {
    const { date, time, movieTitle, ticketPrice, handlingFee } = selectEvent;
  
    const total = ticketPrice + handlingFee;
  
    return (
      <div className="container bd-gold">
        {/* Title */}
        <div className="title">您選定的場次 {seatSelectData ? seatSelectData:'尚未選位置'}</div>
        
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
            <span className='col-4' style={{ fontSize: "16px", color: "#333" }}>總計：</span>   
        	  <span className='col-8 text-end'>{total}</span>  
         </div>

         <div className="row my-4">  
           {/* <div className="col-6">
             <button type="button" className="w-100 btn btn-outline-warning">
               重新選票
             </button>
           </div> */}
           <div className="col-12">
        	   <button type="button" className="w-100 btn btn-warning" onClick={()=>payBtn(movieData)}>
           	 前往訂位
           	</button>
           </div>
        </div>        
      </div>
      )
  }
  // ------------------------------------
  
  // 票券預設資訊
  // ------------------------------------
  // const event = {
    // date: `${new Date(movieData?.startDate).toISOString().split('T')[0]}`,
    // date: `2023-07-20`,
    // time: `${new Date(movieData?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
    // time: `14:00`,
    // movieTitle:`${movieData?.movieId.name}`,
    // movieTitle:`鈴芽之旅`,
    // ticketPrice: `${parseInt(movieData?.theaterId.price)}`,    
    // ticketPrice: 220,
    // ticketPrice: `${tickets[0].price}`,
    // handlingFee: 20,
  // };
  // ------------------------------------

  // 座位表
  // ------------------------------------
  function Seat(props:any) {
    const seatClass = props.isTaken ? "seat taken" : "seat available";
    // console.log(props.movieData)
    return (
      <span className="checkbox- me-2">
        {/* <input
          type="checkbox"
          id={props.ckeckId}
          className={seatClass}
          disabled={props.isTaken} 
          onClick={()=>seatBtn(props.seatData, movieData)}
        >
          {props.seatNumber}
        </input> */}
        {/* <label htmlFor={props.ckeckId}>{props.ckeckId}</label> */}
        {/* <label>
          <input
          type="checkbox"
          className={seatClass}
          disabled={props.isTaken} 
          onChange={()=>seatBtn(props.seatData, movieData)}
        > */}
          {/* {props.seatNumber} */}
        {/* </input> */}
          {/* {props.ckeckId}</label> */}
{/* 測試選單按鈕 */}
        <div className="d-inline-block checkbox-circle">
        <input
          type="checkbox"
          id={`custom-checkbox-${props.ckeckId}`}
          className={seatClass}
          checked={checkedState[props.ckeckId]}     
          disabled={props.isTaken}
          onChange={() => seatBtn(props.seatData, movieData,props.ckeckId)}
        />
        {/* <label htmlFor={`custom-checkbox-${props.ckeckId}`}>{props.ckeckId}</label> */}
      </div>
{/* 測試選單按鈕 */}
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
      	<div className="col-10 ofset-1">
          	{seats}
        </div>
  	  </div>
    );
  }
  // ------------------------------------

  // 座位表預設
  // ------------------------------------
  // 假設已有被預定的位置
   const takenSeats = [4,5,12];

   // 計算每排開始、結束的位置及該排是否需要留空
   const rowsConfig = [
     { name: 'A', start:1, end:14 },
     { name: 'B', start:15, end:28 },
     { name: 'C', start:29, end:42 },
     { name: 'D', start:43, end:56 },
     { name: 'E', start:57, end:70 },
     { name: 'F', start:71, end:84 },
     { name: 'G', start:85, end:98 },
     { name: 'H', start:99, end:112 }
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

          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
            
            <div className="d-flex align-items-center ustify-content-center mb-3">
          		<span className="font-weight-bold me-2"> </span> {/* 空一格，讓數字對齊 */}
          		{[...Array(14)].map((_, i) => ( /* 建立1~14的陣列 */
            		<span key={i} className="me-3">{i+1}</span>
          		 ))}
      	     </div>
              
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

      <div className="row mt-5 d-none">
        <div className="col-12">
          <button onClick={()=>btnPay(payData)}>結帳</button>
        </div>
      </div>
      
      <div className="row mt-5 d-none">
        <div className="col-12">
          <form action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
            {/* <input type="text" name="MerchantID" ref="MerchantID" value="MS148574761"/> */}
            <input type="text" name="MerchantID" value="MS148574761"/>
            {/* <input type="text" name="TradeSha" v-model="TradeSha" :ref="TradeSha"> */}
            <input type="text" name="TradeSha" value={newebpayData.TradeSha}/>
            {/* <input type="text" name="TradeInfo" v-model="TradeInfo" :ref="TradeInfo"> */}
            <input type="text" name="TradeInfo" value={newebpayData.TradeInfo}/>
            {/* <input type="text" name="TimeStamp" v-model="TimeStamp" :ref="TimeStamp"> */}
            <input type="text" name="TimeStamp" value={newebpayData.TimeStamp}/>
            {/* <input type="text" name="Version" value="1.5" ref="Version"> */}
            <input type="text" name="Version" value={newebpayData.Version}/>
            {/* <input type="text" name="MerchantOrderNo" v-model="MerchantOrderNo" :ref="MerchantOrderNo"> */}
            <input type="text" name="MerchantOrderNo"value={newebpayData.MerchantOrderNo}/>
            {/* <input type="text" name="Amt" v-model="Amt" :ref="Amt"> */}
            <input type="text" name="Amt" value={payData.Amt}/>
            {/* <input type="text" name="ItemDesc" v-model="ItemDesc" :ref="ItemDesc"> */}
            {/* <input type="text" name="ItemDesc" value={payData.ItemDesc}/> */}
            {/* <input type="email" name="Email" v-model="Email" :ref="Email"> */}
            <input type="email" name="Email" value={payData.Email}/>
            <button type="submit">送出</button>
          </form>
        </div>
      </div>
    </div>    

  );
}
// export default SeatInfo;