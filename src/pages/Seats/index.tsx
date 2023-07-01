import React, { MutableRefObject, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { SeatList } from './components/SeatList';
import axios from 'axios';
import { Loading } from '../../components';
import {SeatInfo} from './components/SeatChoose'

interface SeatsProps {
}

export interface SeatsType {
	seat_id: string,
	is_booked: boolean
}

// const url = process.env.REACT_APP_REMOTE_URL
// const url = "https://9b71893b-9621-4845-b234-553e758f8f8a.mock.pstmn.io"
const url = 'https://crazymovie.onrender.com'

export const Seats: React.FC<SeatsProps> = ({ }) => {
	const tickNumber = Number(useParams().tickNumber)
	const {id}= useParams();
	const [seats, setSeats] = useState<SeatsType[]>([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		(async function () {
			setLoading(true)
			try {
				// let response = await axios.get(`${url}/seats`)
				// let response = await axios.get(`http://127.0.0.1:3000/api/screens/${id}`)
				let response = await axios.get(`${url}/api/screens/${id}`)
				console.log(response);
				
				setSeats(response.data.data.seatStatus)
				setLoading(false)
			} catch (error) {
				console.log('error', error);
			}
		}())
	}, [])

	const [selectSeat, setSelectSeat] = useState<string[]>([]);
	console.log(' seats=> ', seats)

	const pickSeat = (seat_id: string, selectRef: MutableRefObject<boolean>) => {
		setSelectSeat((prevData) => {
			if (prevData.length < tickNumber && !prevData.includes(seat_id)) {
				selectRef.current = !(selectRef.current)
				return [...prevData, seat_id];
			} else if (prevData.includes(seat_id)) {
				selectRef.current = !(selectRef.current)
				return prevData.filter((seat) => seat !== seat_id);
			} else if (prevData.length >= tickNumber) {
				console.log('',)
				alert('劃位已超過夠買張數');
			}

			return prevData;
		})
	}
	console.log('selectSeat => ', selectSeat)
	return (
		<>
			<Loading isActive={loading} />
			<SeatInfo></SeatInfo>
			{/* <p>你已選擇了<span>{selectSeat.length}</span>位子</p>
			<p>選擇座位為<span>{`${selectSeat}`}</span></p>
			<ul className='theater'>
				{seats.map((seat) => {
					return (
						// <li key={seat.seat_id}>{seat.seat_id}</li>
						<SeatList key={seat.seat_id} {...seat} onClick={pickSeat} />
					)
				})}
			</ul> */}
		</>
	);
}