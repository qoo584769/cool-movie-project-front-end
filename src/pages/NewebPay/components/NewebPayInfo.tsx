import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "../../../components";
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

  const [isLoading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    _id:'',
    ItemDesc:'',
    createTime:'',
    createdAt:'',
    date:'',
    position:[],
    price:0,
    time:'',
    updatedAt:''
  })

  useEffect(() => {
    setLoading(true);
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
      const url = process.env.REACT_APP_REMOTE_URL
      const res = await axios.get(`${url}/api/order/getOrder?orderId=${id}`)
      setOrderInfo(res.data.data)
      setLoading(false)
    })();
  }, [id]);

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      <Loading isActive={isLoading}></Loading>
      <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-5 ">
          <div className="card bd-gold bg-main text-white">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">電影票券資訊</h2>
              <div className="bg-liner my-4"></div>
              <div className="card-text">
                <p className='d-flex justify-content-between'>
                  <span className="font-weight-bold">電影名稱:</span> { orderInfo.ItemDesc}
                </p>
                <p className='d-flex justify-content-between'>
                  <span className="font-weight-bold">放映時間:</span> { orderInfo.time}
                </p>
                <p className='d-flex justify-content-between'>
                  <span className="font-weight-bold">座位號碼:</span> { orderInfo.position.join(',') }
                </p>
                <p className='d-flex justify-content-between '>
                  <span className="font-weight-bold">票價:</span> { orderInfo.price}
                </p>
                <div className="bg-liner my-4"></div>
                <div className="accordion accordion-flush" >
                  <div className="accordion-item bg-main">
                    <h2 className="accordion-header">
                      <button className="alert alert-secondary w-100 mb-0 fs-4 d-flex justify-content-between border-top-0 border-start-0 border-end-0 border-bottom-2 rounded-bottom-0 rounded-top-1 text-white bg-gray02" type="button" onClick={toggleDetails}>
                        <span className=''>注意事項</span>
                        <span className=''>{showDetails ? '–' : '+'}</span>
                      </button>
                    </h2>
                    {showDetails && (
                    <div className="accordion-collapse " >
                      <div className="accordion-body alert alert-secondary border border-0 text-white bg-gray02">
                        <p>為配合政府防疫政策，請遵守以下規定：</p>
                        <br />
                        <p>▹ 進入本次活動場地，請全程戴口罩</p>
                        <p>▹ 請勿攜帶食物或飲料進場。</p>
                        <p>▹ 請勿使用手機或錄影設備。</p>
                      </div>
                    </div>
                    )}
                  </div>
                </div>

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