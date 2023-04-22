import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
	const url = 'http://localhost:3010/users/profile';
	const [userToken, setUserToken] = useLocalStorage('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzlhMGZjZWNmN2FlNjA0Nzg3ZDQ4YyIsImlhdCI6MTY4MTUwNTAxNCwiZXhwIjoxNjgyMTA5ODE0fQ.guYZPwwFxL5JZ5dqwCFFaYL8rnipSj-vMgLNR9-2cyU');
	const currentTime = Math.floor(Date.now() / 1000);
	// const storedValue = localStorage.getItem(key);
	// console.log('localStorage.getItem(key)',localStorage.getItem("userToken"))
	// const token = JSON.parse(localStorage.getItem("userToken") || "")

	// const tokenExpireTime = JSON.parse(atob(token.split('.')[1]))
	// console.log('tokenExpireTime => ', tokenExpireTime);
	// console.log('currentTime => ', currentTime);
	// useEffect(() => {
	// 	(async function () {
	// 		try {

	// 			let response = await axios({
	// 				method: 'GET',
	// 				url: url,
	// 				headers: {
	// 					// responseType: 'json',
	// 					Authorization: `Bearer ${token}` 
	// 				}
	// 			})
	// 			console.log('response', response)
	// 		} catch (error) {
	// 			console.log('error', error);
	// 		}
	// 	}())
	// }, [])
	const [isLogin, setIsLogin] = useState(false)
	const navigate = useNavigate()
	const memberId = JSON.stringify(Math.ceil(Math.random() * 10000000))
	const clickHandler = () => {
		setIsLogin(state => !state)
		if (isLogin) {
			navigate("/")
		}
	}
	return (
		<nav className="navbar bg-light">
			<form className="container-fluid justify-content-end">

				{isLogin ? (
					<>
						<NavLink className="nav-link" to={`/member/${memberId}`}><i className=" bi-person-circle me-2 btn-outline-success" ></i></NavLink>
						<span className='me-3'>歡迎Ellson登入</span>
					</>
				) : ""}

				<button className="btn btn-sm btn-outline-success me-2" type="button" onClick={clickHandler}>
					{isLogin ? "登出" : "註冊 / 登入"}
				</button>
			</form>
		</nav>

	);
}
