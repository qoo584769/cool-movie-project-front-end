import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

interface PaymentInfoProps {
  
}
interface MovieTicketProps {
  movieName: string;
  theater: string;
  showTime: string;
  seatNumber: string;
}
const NewebPayInfo: React.FC<PaymentInfoProps> = ({
  // movieName,
  // theater,
  // showTime,
  // seatNumber,
}) => {
  const {id}= useParams();
  useEffect(() => {
    console.log('付款返回',id);
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
      const url = 'https://crazymovie.onrender.com'
      // const res = await axios.get(`http://127.0.0.1:3000/api/order/getOrder?orderId=${id}`)
      const res = await axios.get(`${url}/api/order/getOrder?orderId=${id}`)
    console.log(res);
      // res.data.data.email = 'uh584697213@gmail.com'  
    })();
  }, [id]);

  return (
    <>
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">電影票券資訊</h2>
              <div className="card-text">
                <p>
                  <span className="font-weight-bold">電影名稱:</span> 123
                </p>
                <p>
                  <span className="font-weight-bold">影院:</span> 123
                </p>
                <p>
                  <span className="font-weight-bold">放映時間:</span> 123
                </p>
                <p>
                  <span className="font-weight-bold">座位號碼:</span> 123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NewebPayInfo