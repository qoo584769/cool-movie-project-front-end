/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState, useEffect, useContext, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { OrderContext } from '../stroe'
import { Login, Logout } from './';


interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
	const [state, dispatch] = useContext(OrderContext);
	const [userName, setUserName] = useState("")
	const [isLogin, setIsLogin] = useState(false)
	const navigate = useNavigate()
	const userId = (localStorage.getItem("userId")) ? (localStorage.getItem("userId")) : null
	const memberName = (localStorage.getItem("userName")) ? (localStorage.getItem("userName")) : null
	// const memberId = JSON.stringify(Math.ceil(Math.random() * 10000000))
	useEffect(() => {
		if (userId) {
			setIsLogin(true)
		}
		dispatch({
			type: "ADD_MEMBER_ID",
			payload: {
				memberId: userId,
				status: "member"
			}
		})
	}, [dispatch])

	const memberCheck = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
		// event.preventDefault()
		// navigate(`/member/${memberId}`)
	}

	return (
		<nav className="navbar">
			<div className="container-fluid justify-content-end">
				{isLogin ? (
					<>
						<NavLink className="nav-link navLink" to={`/member/${userId}`} onClick={memberCheck}>
							<i className=" bi-person-circle btn-outline-warning" ></i>
						</NavLink>
						<span className='me-3'>{(memberName) ? memberName : userName} 您好</span>
					</>
				) : ""}
				{isLogin ? (
					<>
						<Logout
							isLogin={isLogin}
							setIsLogin={setIsLogin}
						/>
					</>
				) : (<Login
					isLogin={isLogin}
					setIsLogin={setIsLogin}
					setUserName={setUserName}
				/>)}
				{/* <Login
					isLogin={isLogin}
					setIsLogin={setIsLogin}
				/> */}
			</div>
		</nav>

	);
}
