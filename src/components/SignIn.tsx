import React, { useState, MutableRefObject, Dispatch, SetStateAction, useContext } from 'react'
import { OrderContext } from '../store';
import { useForm } from "react-hook-form"
import { authFetch } from '../utilities';
import { Loading } from './';

interface LoginPropsType {
	myModal: MutableRefObject<bootstrap.Modal | null>
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

export interface SignInType {
	useremail: string,
	password: string
}

export const SingIn: React.FC<LoginPropsType> = ({ myModal, setIsLogin }) => {
	const [state, dispatch] = useContext(OrderContext);
	const [loading, setloading] = useState(false)
	const { register, handleSubmit } = useForm<SignInType>();


	const loginForm = (data: SignInType) => {
		(async function () {
			try {
				setloading(true)
				const response = await authFetch.post('/api/member/signin', {
					email: data.useremail,
					password: data.password
				})

				const userToken = response.data.data.token
				const userId = response.data.data.signinRes._id
				const userName = response.data.data.signinRes.nickName
				localStorage.setItem('userToken', userToken)

				dispatch({
					type: "ADD_MEMBER_DATA",
					payload: {
						memberId: userId,
						memberName: userName,
						status: "member"
					}
				})
				myModal.current?.hide();
				document.querySelector(".modal-backdrop")?.remove();
				setloading(false)
				setIsLogin(true)

			} catch (error) {
				console.log('error', error);
			}
		}())
	}

	return (
		<>
			<Loading isActive={loading} />
			<div id="login-tab-content">
				<form className="login-form" onSubmit={handleSubmit(loginForm)}>
					<input
						type="text"
						className="input"
						id="user_login"
						autoComplete="off"
						placeholder="Email or Username"
						{...register("useremail")}
					/>
					<input
						type="password"
						className="input"
						id="user_pass"
						autoComplete="off"
						placeholder="Password"
						{...register("password")}

					/>
					<input type="checkbox" className="checkbox" id="remember_me" />
					<label htmlFor="remember_me" className='remember_me'>記住我</label>
					<button type="submit" className="button">登入</button >
				</form>
				<div className="help-text">
					{/* <p><a href="#">忘記密碼</a></p> */}
				</div>
			</div>
		</>
	);
}