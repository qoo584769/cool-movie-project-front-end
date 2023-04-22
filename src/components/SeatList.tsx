import React, { MutableRefObject,RefObject, useRef,useState } from 'react'
import styled,{DefaultTheme, ThemedStyledProps} from 'styled-components'
import { SeatsType } from '../pages/Seats'

interface SeatStatusType{
	seatStatus:boolean,
	setRef:boolean
}

const Li = styled.li<SeatStatusType>`
    background-color: ${(props)=>{
		if(!props.seatStatus){
			return "#fcc"
		}else if(props.setRef){
			return "#cfc"
		}else{
			return "#eee"
		}
	}}
`


interface SeatListProps extends SeatsType {
	onClick: (
		seat_id:string,
		selectRef:MutableRefObject<boolean>
	)=>void
}

export const SeatList: React.FC<SeatListProps> = ({seat_id,is_booked,onClick}) => {
	const selectRef = useRef(false)
	
	const clickHandler = (event: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>) =>{
		if(is_booked){
			onClick(seat_id,selectRef)			
		}else{
			alert("該座位已被劃位")
		}
	}
	return (
		<Li
			seatStatus={is_booked}
			onClick={clickHandler}
			setRef={selectRef.current}
		>
		{seat_id}
		</Li>

	);
}