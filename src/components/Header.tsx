
import React, { useState, useEffect, useContext, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { OrderContext } from '../store'
import { Login, Logout } from './';
import { authFetch, logoutClear, getCookie } from '../utilities';


interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
	const [state, dispatch] = useContext(OrderContext);
	const [isLogin, setIsLogin] = useState(false)
	const memberName = (state.orderList.memberName) ? (state.orderList.memberName) : ""
	const token = (localStorage.getItem("userToken")) ? localStorage.getItem("userToken") : null
	const navigate = useNavigate()

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

	return (
		<div className='container headerContainer'>
			<nav className="navbar">
				<div className="container-fluid p-0 space-between">
					<a className='logo' onClick={() => navigate("/")}>
						<img src="/src/assets/images/Logo.svg" alt="" />
					</a>
					<ul className='menuWrap'>
						<NavLink to={`/benifet`}><li>好康優惠</li></NavLink>
						<NavLink to={`/aboutus`}><li>關於影城</li></NavLink>
					</ul>
					{isLogin ? (
						<div className='loginNav'>
							<NavLink className="nav-link navLink" to={`/member`}>
								<i className=" bi-person-circle btn-outline-warning" ></i>
							</NavLink>
							<span className='me-2'>{memberName} 您好</span>
							<Logout isLogin={isLogin} setIsLogin={setIsLogin} />
						</div>
					) : (
						<Login
							isLogin={isLogin}
							setIsLogin={setIsLogin}
						/>
					)}

				</div >
			</nav >
		</div>

	);
}
