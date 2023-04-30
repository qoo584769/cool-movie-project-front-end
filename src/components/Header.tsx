
import React, { useState, useEffect, useContext, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom';
import { OrderContext } from '../stroe'
import { Login, Logout } from './';
import { authFetch, logoutClear } from '../utilities';


interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
	const [state, dispatch] = useContext(OrderContext);
	const [isLogin, setIsLogin] = useState(false)
	const memberId = (state.orderList.memberId) ? (state.orderList.memberId) : null
	const memberName = (state.orderList.mamberName) ? (state.orderList.mamberName) : ""
	const token = (localStorage.getItem("userToken")) ? localStorage.getItem("userToken") : null

	useEffect(() => {
		if (token) {
			const tokenExpTime = JSON.parse(atob(token?.split(".")[1] || "")).exp;
			const currentTime = Math.floor(Date.now() / 1000);

			// 如果原本的token沒過期，則繼續向後端拿資料
			if (tokenExpTime > currentTime) {
				(async function () {
					try {
						let response = await authFetch.get('/api/member/getUser')
						const userName = response.data.data.nickName
						const userId = response.data.data._id

						dispatch({
							type: "ADD_MEMBER_DATA",
							payload: {
								memberId: userId,
								mamberName: userName,
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

	const memberCheck = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
		// event.preventDefault()
		// navigate(`/member/${memberId}`)
	}

	return (
		<nav className="navbar">
			<div className="container-fluid justify-content-end">
				{isLogin ? (
					<>
						<NavLink className="nav-link navLink" to={`/member/${memberId}`} onClick={memberCheck}>
							<i className=" bi-person-circle btn-outline-warning" ></i>
						</NavLink>
						<span className='me-3'>{memberName} 您好</span>
					</>
				) : ""}
				{
					isLogin ? (
						<Logout
							isLogin={isLogin}
							setIsLogin={setIsLogin}
						/>
					) : (<Login
						isLogin={isLogin}
						setIsLogin={setIsLogin}
					/>)
				}
			</div >
		</nav >

	);
}
