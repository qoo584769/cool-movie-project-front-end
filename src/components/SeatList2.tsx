import React, { MutableRefObject,RefObject, useRef } from 'react'
import styled,{DefaultTheme, ThemedStyledProps} from 'styled-components'

interface SeatType {
	setRef:boolean,
 }

const Li = styled.li<SeatType>`
    background-color: ${(props)=>props.setRef? "#cfc":"#fff"}
`

interface SeatListProps {
	index: number
	onClick: (
		seatNumber: string,
		selectRef:MutableRefObject<boolean>
	) => void
}


export const SeatList2: React.FC<SeatListProps> = ({ index, onClick }) => {
	const selectRef = useRef(false)
	const clickHandler = (event: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
		const seatNumber = String((event.target as HTMLLIElement).value)
		onClick(seatNumber,selectRef)

	}

	return (
		<>
			<Li 
				onClick={clickHandler} 
				value={index + 1} 
				setRef={selectRef.current}
				>
					{index + 1}{selectRef.current.toString()}
			</Li>
		</>
	)
}