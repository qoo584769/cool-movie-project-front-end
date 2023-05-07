import React, { useContext, useState, Dispatch, SetStateAction } from 'react'
import { OrderContext } from '../store'
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
	isLogin: boolean
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

export const Logout: React.FC<LogoutProps> = ({ isLogin, setIsLogin }) => {
	const [state, dispatch] = useContext(OrderContext);
	const navigate = useNavigate()

	const clickHandler = () => {
		localStorage.removeItem("userToken")
		setIsLogin(false)
		document.cookie = "remember_me=; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		if (isLogin) {
			dispatch({
				type: "CLEAR_ORDER",
				payload: {
					memberId: null,
					status: "quick",
					memberName: "",
				}
			})
			navigate("/")
		}
	}
	return (
		<button className="btn btn-sm btn-outline-warning me-2" type="button" onClick={clickHandler}>
			登出
		</button>
	);
}