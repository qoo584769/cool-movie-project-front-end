/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { Login } from './Login';


interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
	console.log('process.env', process.env)
	const url = 'http://localhost:3010/users/sign_in';
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
		<nav className="navbar">
			<div className="container-fluid justify-content-end">
				{isLogin ? (
					<>
						<NavLink className="nav-link" to={`/member/${memberId}`}><i className=" bi-person-circle me-2 btn-outline-success" ></i></NavLink>
						<span className='me-3'>歡迎Ellson登入</span>
					</>
				) : ""}

				<button className="btn btn-sm btn-outline-success me-2" type="button" onClick={clickHandler}>
					{isLogin ? "登出" : "註冊 / 登入"}
				</button>
				<Login />
			</div>
		</nav>

	);
}
