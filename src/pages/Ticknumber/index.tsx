/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Loading } from "../../components";
import { isLoginContext } from '../../store/isLogin';
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
	const { register, handleSubmit } = useForm<TickNumberType>();
	const navigate = useNavigate()
	const {id}= useParams();
	
	// -----------------------
	const [isLoading, setLoading] = useState(false);
	const [movieData, setMovieData] = useState<any>({});
  const [tickets, setTickets] = useState<Ticket[]>([
    { ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)", price: 850, quantity: 1 },
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

  const handleBackClick = (id: any) => {
      // 在此處設定要跳轉的路徑
      navigate(`/movie/${id}`);
  }
  const handleToSeatClick = (id: any, ticketNum:any) => {
				// 在此處設定要跳轉的路徑
				navigate(`/chooseSeates/${id}/${ticketNum}`);
  }

	 function AddSubtractInput({ quantity }: {quantity: number}) {
	
		 return (
			 <div className="input-group bg-dark">
				 <button type="button" className="btn btn-outline-light" onClick={() => setValue(value - 1)} disabled={value <= 1}>-</button>
				 <span className="form-control text-center font-weight-bold bg-light border-0 shadow-none">{value}</span>
				 <button type="button" className="btn btn-outline-light" onClick={() => setValue(value + 1)}>+</button>
			 </div>
		 );
	}
	// 加減按鈕
  useEffect(() => {		
		setLoading(true);
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
			const url = process.env.REACT_APP_REMOTE_URL
      const res = await axios.get(`${url}/api/screens/${id}`)
			const ticketData = [
			{
				ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)",
				price: parseInt( `${res.data.data.theaterId.price+500+150}`),
				quantity: value
			}];
      setMovieData(res.data.data);
      setTickets(ticketData);
      setEvent({
        date: `${new Date(res.data.data?.startDate).toISOString().split('T')[0]}`,
        time: `${new Date(res.data.data?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
        movieTitle:`${res.data.data?.movieId.name}`,
        ticketPrice: `${tickets[0].price * value}`,
        handlingFee: 20,
      })
			setLoading(false);
    })();    
  }, []);
  useEffect(() => {
		setLoading(true);
    // 在組件加載完成後發送 GET 請求獲取數據
    (async()=>{
			const url = process.env.REACT_APP_REMOTE_URL
      const res = await axios.get(`${url}/api/screens/${id}`)
      const ticketData = [
			{
        ticketType: "全票套餐票(1張影票+500元套餐&150飲料X1)",
        price: parseInt( `${res.data.data.theaterId.price+500+150}`),
        quantity: value
      }];
      setMovieData(res.data.data);
      setTickets(ticketData);
      setEvent({
        date: `${new Date(res.data.data?.startDate).toISOString().split('T')[0]}`,
        time: `${new Date(res.data.data?.startDate).toISOString().split('T')[1].substr(0, 5)}`,
        movieTitle:`${res.data.data?.movieId.name}`,
        ticketPrice: `${tickets[0].price * value}`,
        handlingFee: 20,
      })
			setLoading(false);
    })();    
  }, [value]);

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
	return (
		<>
			<Loading isActive={isLoading}></Loading>
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
														<td width="600px" className='bg-dark text-white align-middle'>
															{ticketItem.ticketType}
														</td>
														<td width="100px" className='bg-dark text-white align-middle'>
															{ticketItem.price}
														</td>              
														<td width="200px" className='bg-dark text-white align-middle'>
															<AddSubtractInput quantity = {ticketItem.quantity}/>
														</td>
														<td width="100px" className='bg-dark text-white align-middle'>
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
							<div className="mt-4">
								<div className="mb-2">
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
		</>
	);
}