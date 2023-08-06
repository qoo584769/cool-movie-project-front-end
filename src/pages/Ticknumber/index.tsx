/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { OrderContext } from '../../store';
import {Login} from '../../components/Login';
import { authFetch, logoutClear, getCookie } from '../../utilities';
import axios from 'axios';
interface OrderFastProps {

}

interface Ticket {
	ticketType: string,
	price:number,
	quantity:number
}

interface Event {
		date: string,
    // date: `2020-10-10`,
    time: string,
    // time: `14:00`,
    movieTitle:string,
    // movieTitle:`玲芽之旅`,  
    // ticketPrice: 220,
    ticketPrice: string,
    handlingFee: number,
}

export const Ticknumber: React.FC<OrderFastProps> = ({ }) => {
	const [state, dispatch] = useContext(OrderContext);
	const { register, handleSubmit } = useForm<TickNumberType>();
	const [isLogin, setIsLogin] = useState(false)
	const memberName = (state.orderList.memberName) ? (state.orderList.memberName) : ""
	const token = (localStorage.getItem("userToken")) ? localStorage.getItem("userToken") : null
	const navigate = useNavigate()
	const {id}= useParams();

// -----------------------
	const [movieData, setMovieData] = useState<any>({});
  const [tickets, setTickets] = useState<Ticket[]>([
    // { type: "", price: 0, quantity: 0 },
    { ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)", price: 980, quantity: 1 },
  ]);

  const [event, setEvent] = useState<any>({
    date: ``,
    // date: `2020-10-10`,
    time: ``,
    // time: `14:00`,
    movieTitle:``,
    // movieTitle:`玲芽之旅`,  
    // ticketPrice: 220,
    ticketPrice: ``,
    handlingFee: 20,
  })
  
	const [value, setValue] = useState<number>(1);

	const [seatPage, setSeatPage] = useState<any>(false);

  const handleBackClick = (id: any) => {
      // 在此處設定要跳轉的路徑
      navigate(`/movie/${id}`);
  }
  const handleToSeatClick = (id: any, ticketNum:any) => {
		console.log(isLogin)
			if(token !== null){
				setIsLogin(true)
			}
			if( isLogin ){
				// 在此處設定要跳轉的路徑
				navigate(`/chooseSeates/${id}/${ticketNum}`);
				return
			}
			else{
				setSeatPage(true)
			}
  }
  
	// 加減按鈕
	
  // const handleValueChange = (event: { target: { value: string; }; }) => {
  //   const newValue = parseInt(event.target.value);
  //   if (!isNaN(newValue)) {
  //     setValue(newValue);
  //   }
  // };

  // const handleAddClick = () => {
  //   setValue(value + 1);
  // };

  // const handleSubtractClick = () => {
  //   if (value > 0) {
  //     setValue(value - 1);
  //   }
  //  };

	 function AddSubtractInput({ quantity }: {quantity: number}) {
		// const [value, setValue] = useState<number>(quantity);
		
	
		const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			let newValue = parseInt(event.target.value);
			console.log(event)
			// if (!isNaN(newValue)) {
			// 	setValue(newValue);
			// }else if (newValue < 1) {
			// 	newValue = 1;
			// }
			// console.log(value)
			console.log(123);
			
		};
	
		 return (
			 <div className="input-group mb-3 bg-dark">
				 <button type="button" className="btn btn-outline-light" onClick={() => setValue(value - 1)} disabled={value <= 1}>-</button>
				 <input 
					 type="number" 
					 min="0"
					 max="9999"
					 value={value} 
					 onChange={(e)=>handleValueChange(e)}
					 className="form-control text-center font-weight-bold bg-light border-0 shadow-none"
				 />
				 <button type="button" className="btn btn-outline-light" onClick={() => setValue(value + 1)}>+</button>
			 </div>
		 );
	}
	// 加減按鈕
  useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
			console.log(id);
			const url = 'https://crazymovie.onrender.com'
      // const res = await axios.get(`http://127.0.0.1:3000/api/screens/${id}`)
      const res = await axios.get(`${url}/api/screens/${id}`)
    console.log(res.data.data);
    // console.log(res);
      // setMovieData(res.data.data);
      const ticketData = {
        ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)",
        price: parseInt( `${res.data.data.theaterId.price+500+150}`),
        // price: 850,
        quantity: value
      };
      setMovieData(res.data.data);
      setTickets([ticketData]);
      setEvent({
        date: `${new Date(res.data.data?.startDate).toISOString().split('T')[0]}`,
        time: `${new Date(res.data.data?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
        movieTitle:`${res.data.data?.movieId.name}`,
        ticketPrice: `${tickets[0].price * value}`,
        handlingFee: 20,
      })
    })();    
  }, []);
  useEffect(() => {
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
			console.log(id);
			const url = 'https://crazymovie.onrender.com'
      // const res = await axios.get(`http://127.0.0.1:3000/api/screens/${id}`)
      const res = await axios.get(`${url}/api/screens/${id}`)
    console.log(res.data.data);
    // console.log(res);
      // setMovieData(res.data.data);
      const ticketData = {
        ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)",
        price: parseInt( `${res.data.data.theaterId.price+500+150}`),
        // price: 850,
        quantity: value
      };
      setMovieData(res.data.data);
      setTickets([ticketData]);
      setEvent({
        date: `${new Date(res.data.data?.startDate).toISOString().split('T')[0]}`,
        time: `${new Date(res.data.data?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
        movieTitle:`${res.data.data?.movieId.name}`,
        ticketPrice: `${tickets[0].price * value}`,
        handlingFee: 20,
      })
    })();    
  }, [value]);

// -----------------------
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
				} catch (error) {
					console.log('error', error);
				}
				setIsLogin(true)
			}())
		} else {
			logoutClear(dispatch)
			setIsLogin(false)
		}
	} else {
		logoutClear(dispatch)
		setIsLogin(false)
	}
}, [dispatch])
// -----------------------
useEffect(() => {
	if(isLogin && seatPage){
		setSeatPage(false)
		window.location.reload()
	}
},[isLogin])

// -----------------------

// -----------------------
// const handleInputChange = (index, event) => {
// 	const values = [...tickets];
// 	if (event.target.name === "type") {
// 		values[index].type = event.target.value;
// 	} else if (event.target.name === "price") {
// 		values[index].price = parseInt(event.target.value);
// 	} else if (event.target.name === "quantity") {
// 		values[index].quantity = parseInt(event.target.value);
// 	}
// 	setTickets(values);
// };

// const handleAddTicketRowClick = () => {
// 	 setTickets([...tickets,{ type:'', price:0, quantity:0 }]);
//  };
// -----------------------

// -----------------------
function SelectedEvent(props: any ) {
	const { date, time, movieTitle, ticketPrice, handlingFee } = props.event;

	const total = parseInt(ticketPrice) + handlingFee;

	return (
		<div className="container bd-gold">
			{/* Title */}
			<div className="title">您選定的場次</div>
			
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
					<span className='col-6'>票券金額：</span>  
					<span className='col-6 text-end'>{ticketPrice} 元</span>
					<span className='col-6'>手續費：</span>   
					<span className='col-6 text-end'>{handlingFee}</span>  
					<span className='col-6' style={{ fontSize: "16px" }}>總計：</span>   
					<span className='col-6 text-end'>{total}</span>  
			 </div>

			 <div className="row my-4">  
				 <div className="col-6">
					 <button type="button" className="w-100 btn btn-outline-warning" onClick={()=>handleBackClick(movieData.movieId._id)}>
						 重新選票
					 </button>
				 </div>
				 <div className="col-6">
					 <button type="button" className="w-100 btn btn-warning" onClick={()=>handleToSeatClick(movieData._id, value)}>
						前往訂位
					 </button>
					 <div className="position-absolute" style={{top: "-100000px"}}>
					 	<Login isLogin={isLogin} setIsLogin={setIsLogin} setSeatPage={setSeatPage} seatPage={seatPage}></Login>
					 </div>
				 </div>
			</div>        
		</div>
		)
}
// -----------------------

	interface TickNumberType {
		tickNum: number
	}

	const onSubmit = (data: TickNumberType) => {
		navigate(`/chooseSeates/${(data.tickNum)}`);
	}
	// console.log('state', state)
	return (
		<div>
			{/* <p>{JSON.stringify(state)}</p>
			你要訂幾個座位
			<form onSubmit={handleSubmit(onSubmit)}>
				<select
					{...register("tickNum", {
						setValueAs: (value) => parseInt(value, 10),
					})}
				>
					{[...Array(5)].map((__, index) => {
						return (
							<option value={index + 1} key={index}>{index + 1}</option>
						)
					})}
				</select>
				<button type='submit'>確定</button>
			</form> */}

			{/* ------------------------- */}
			<div className="container mt-5">
				<div className="row mt-5">
					<div className="col-12">重設場次</div>
				</div>
				
				<div className="row mt-3">
					<div className="col-12">
						<div className="">
							1.選擇品項
						</div>
						<div className="">
							
						</div>
					</div>
					<div className="col-12">請選擇所需要的電影票張數，請注意，本訂票將直接付款，訂票每張票收取 20 元手續費，線上付款每筆交易訂購最多6張。 </div>
				</div>

				<div className="row mt-5">
					{/* 選擇數量 */}
					<div className="col-12 col-md-8">
						<ul className="p-0">
							<li className=''>
								<div className="">

									<h1>優惠套票</h1>
									{/* Table */}
									<table className="table text-white">
										<thead>
											<tr>
												<th scope="col" className='bg-dark text-white'>票種</th>
												<th scope="col" className='bg-dark text-white'>單價</th>
												<th scope="col" className='bg-dark text-white'>數量</th>
												<th scope="col" className='bg-dark text-white'>小計</th>
											</tr>  
										</thead>

										<tbody >
										{ tickets?.map((ticketItem,index)=>(
											// Each Row
												<tr key={index} >
													<td width="600px" className='bg-dark text-white'>
														{ticketItem.ticketType}
													</td>
													<td width="100px" className='bg-dark text-white'>
														{ticketItem.price}
													</td>              
													<td width="200px" className='bg-dark text-white'>
														{/* {ticketItem.quantity} */}
														{/* <div className="input-group mb-3">
															<button type="button" className="btn btn-outline-secondary" onClick={handleSubtractClick}>-</button>
															<input type="number" min="0" max="9999" value={value} onChange={handleValueChange} className="form-control"/>
															<button type="button" className="btn btn-outline-secondary" onClick={handleAddClick}>+</button>
														</div> */}
														<AddSubtractInput quantity = {ticketItem.quantity}/>
													</td>
													<td width="100px" className='bg-dark text-white'>
														{ticketItem.price*ticketItem.quantity}
													</td>								
												</tr>
										))}
										</tbody>
										<tfoot>						
										</tfoot>
									</table> 
									
								</div>
							</li>
						</ul>
					</div>
					{/* 選擇數量結束 */}
					<div className="col-12 col-md-4">
						
						<SelectedEvent event={event}></SelectedEvent>
						
						{/* 注意事項 */}
						<div className="">
							<div className="">
								注意事項
							</div>

							<ul className="">
								<li className="list-disc">若須取消訂票，請於該場次開演前 40 分鐘登入至訂票查詢取消。</li>
								<li className="list-disc">訂票完成並以信用卡付款成功，等同已購買,請確認所選場次與影城無誤，如訂錯影城、影、時間，已過場次而未取票者，由觀眾自行負擔，此筆費用恕不退還。</li>
							</ul>
						</div>
					</div>
				</div>
    	</div>  
			{/* ------------------------- */}
		</div>
	);
}