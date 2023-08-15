import React, { useContext,useState, useEffect,useLayoutEffect,ChangeEvent } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMember } from "../../../api/member";
import { Loading } from "../../../components";
import axios from 'axios';
// import PaymentForm from './OrderForm'

interface Event {
  date: string;
  ItemDesc: string;
  position: number;
  price: number;
}

interface PayData {
  // 定義 payData 的屬性類型
  // 根據您的需求進行修改
}

interface Props {
  event: Event;
  payData: PayData;
  btnPay: () => void;
}

const event: Event = {
  date: "2023-06-30",
  ItemDesc: "Event description",
  position: 1,
  price: 10,
}



function OrderInfoEvent({ event ,payData={},btnPay }: Props) {
    const { date, ItemDesc, position, price } = event;  
    const total = price + 20;  
    return (
      <div className="container bd-gold">
        {/* Title */}
        <div className="title">您選定的場次 {position}</div>
        
        <div className="bg-gold my-4" style={{ height: "2px"}}></div>
        {/* Date and Time and Movie */}
        <div className="row ">
          <div className='col-4'>日期：</div>
          <span className='col-8 text-end'>{date}</span>
          <div className='col-4'>時間：</div>
          <span className='col-8 text-end'>14:00</span>
      		<span className='col-4'>電影：</span>   
        	<span className='col-8 text-end'>{ItemDesc}</span>    
        </div>  
        
        <div className="bg-gold my-4" style={{ height: "2px"}}></div>
        {/* Ticket Price */} 
      	<div className='row'>
          	<span className='col-4'>票券金額：</span>  
            <span className='col-8 text-end'>{price} 元</span>
            <span className='col-4'>手續費：</span>   
        	  <span className='col-8 text-end'>{20}</span>  
            <span className='col-4' style={{ fontSize: "16px", color: "#fff" }}>總計：</span>   
        	  <span className='col-8 text-end'>{total}</span>  
         </div>

         <div className="row my-3">  
           {/* <div className="col-6">
             <button type="button" className="w-100 btn btn-outline-warning">
               重新選票
             </button>
           </div> */}
           <div className="col-12">
        	   {/* <button type="button" className="w-100 btn btn-warning" onClick={()=>payBtn(movieData)}>
           	 前往訂位
           	</button> */}
             {/* <button className="btn btn-warning" onClick={()=>btnPay(payData)}>結帳</button> */}
             <button className="btn btn-warning d-none" onClick={()=>btnPay()}>結帳</button>
           </div>
        </div>        
      </div>
      )
  }

  
  function OrdersInfo(){
    const navigate = useNavigate();
    const {id}= useParams();
    let [payData, setPayData] = useState({
      orderId:'',
      Amt:'',
      Email:'',
      ItemDesc:''
    })
  
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<Event>(event)
  
  let [newebpayData,setNewebpayData] = useState({
    TimeStamp:'',
    MerchantOrderNo:'',
    TradeSha:'',
    TradeInfo : '',
    ItemDesc : '',
    Email:'',
    MerchantID : 'MS148574761',
    Version : '1.5'
  })

  const emailChange=(e: ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
    // setPayData(pre => {return {
    //   Amt:pre.Amt,
    //   Email:e.target.value,
    //   ItemDesc:pre.ItemDesc
    // }});
    setEmail(e.target.value);
  }

  const btnPay = (data:any={})=>{
    const data1 = payData;
    const url = process.env.REACT_APP_REMOTE_URL
      axios.post(`${url}/api/newebpay/createOrder`,data1).then(res=>{
        setNewebpayData({
          TimeStamp : res.data.data.order.TimeStamp,
          MerchantOrderNo : res.data.data.order.MerchantOrderNo,
          TradeSha : res.data.data.sha,
          TradeInfo : res.data.data.aes,
          ItemDesc : res.data.data.order.Name,
          Email : res.data.data.order.Email,
          MerchantID : 'MS148574761',
          Version : '1.5'
        })
      }).catch(e=>{
      console.log(e);
    })
  }
  
  useEffect(() => {
    setLoading(true);
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
      const url = process.env.REACT_APP_REMOTE_URL
      const { data: response } = await getMember();
      const res = await axios.get(`${url}/api/order/getOrder?orderId=${id}`)
      const { data: memberInfo } = response;
      const { email } = memberInfo;      
      setOrderInfo(res.data.data);
      setPayData({
        orderId:res.data.data._id,
        Amt:res.data.data.price,
        Email:email,
        ItemDesc:res.data.data.ItemDesc
      });   
      setLoading(false);
    })();    
  }, []);

  useEffect(()=>{
    btnPay()
  },[payData])
  return (
    <>
      <Loading isActive={isLoading}></Loading>
      <div className="container mt-5">      
        <div className="row mt-5">
          
          <div className="col-8">     
          <form className='d-non' action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
              <div className="form-group ">
                {/* MerchantID field */}
                <div className="form-floating mb-3 d-none">
                  <input type="text" name="MerchantID" id="MerchantID" className="form-control " value="MS148574761"/>
                  <label htmlFor="MerchantID">Merchant ID:</label>
                </div>
                {/* TradeSha field */}
                <div className="form-floating mb-3 d-none">
                  <input type='text' name='TradeSha' id='TradeSha' className='form-control ' value={newebpayData.TradeSha}/>
                  <label htmlFor='TradeSha'>Trade Sha:</label>
                </div>

                {/* TradeInfo field */}
                <div className="form-floating mb-3 d-none">
                  <input type='text' name='TradeInfo' id ='TradeInfo' className = "form-control " value={newebpayData.TradeInfo} />
                  <label htmlFor='TradeInfo'>Trade Info:</label>                
                </div>

                {/* TimeStamp field */}
                <div className="form-floating mb-3 d-none">
                  <input type ='text' name = 'TimeStamp' id = 'TimeStamp' className= "form-control " value ={newebpayData.TimeStamp} />
                  <label htmlFor ='TimeStamp'>TimeStamp:</label>     
                </div>

                <div className="form-floating mb-3 d-none">
                  {/* Version field*/}
                  <input type ="text" name ="Version" id ="Version" className = "form-control" value ={newebpayData.Version} />
                  <label htmlFor ="Version">Version: </label> 
                </div>

                <div className="form-floating mb-3 d-none">
                  {/* MerchantOrderNo */}
                  <input type ='text' name =' MerchantOrderNo' id= 'MerchantOrderNo' className =" form-control" value ={newebpayData.MerchantOrderNo} />
                  <label htmlFor= 'MerchantOrderNo'> 訂單編號</label>  
                </div>

                <div className="form-floating mb-3 d-none">
                  {/* Amt field */}
                  <input type='text' name='Amt' id='Amt' className='form-control' value={payData.Amt}/>
                  <label htmlFor='Amt'>金額</label>
                </div>

                <div className="form-floating mb-3 d-none">
                  {/* ItemDesc field */}
                  <input type="text" name="ItemDesc" id="ItemDesc" className ="form-control" value ={payData.ItemDesc} />
                  <label htmlFor = "ItemDesc">電影名稱</label> 
                </div>

                <div className="form-floating mb-3">
                  {/* Email field */}
                  <input type ='email' name ='Email' id = 'Email' className= "form-control bg-dark text-white pt-5 pb-4" value ={newebpayData.Email} onChange={emailChange}/>
                  <label htmlFor ='Email' className='floating-text text-light'>信箱</ label>
                </div>

                {/* <div className="form-floating mb-3">
                  Email field
                  <input type ='email' name ='Email' id = 'Email' className= "form-control" value ={email} onChange={emailChange}/>
                  <label htmlFor ='Email'>Email address: </label>
                </div> */}
              </div>
              <button type="submit" className='btn btn-outline-warning'>結帳</button>
            </form>     
          </div>
          
          <div className="col-4">
            <OrderInfoEvent event= {orderInfo} payData={payData} btnPay={btnPay}></OrderInfoEvent>       
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersInfo;