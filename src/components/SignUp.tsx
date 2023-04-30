import React, { useState, useContext, useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react'
import { OrderContext } from '../store'
import { useForm } from "react-hook-form"
import { authFetch } from '../utilities';
import { SignInType } from './';
import { Loading } from './';

interface SignUpPropsType {
	myModal: MutableRefObject<bootstrap.Modal | null>
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

interface SingUpType extends SignInType {
	username: string
}

export const SignUp: React.FC<SignUpPropsType> = ({ myModal, setIsLogin }) => {
	const [state, dispatch] = useContext(OrderContext);
	const [loading, setloading] = useState(false)
	const { register, handleSubmit } = useForm<SingUpType>();

	const signUpForm = (data: SingUpType) => {
		(async function () {
			setloading(true)
			try {
				const response = await authFetch.post('/api/member/signup', {
					nickName: data.username,
					email: data.useremail,
					password: data.password
				})
				const userToken = response.data.data.token
				const userId = response.data.data.createRes._id
				const userName = response.data.data.createRes.nickName
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
			<div id="signup-tab-content">
				<form className="signup-form" onSubmit={handleSubmit(signUpForm)}>
					<input
						type="text"
						className="input"
						id="user_name"
						autoComplete="off"
						placeholder="Username"
						{...register("username")}
					/>
					<input
						type="email"
						className="input"
						id="user_email"
						autoComplete="off"
						placeholder="Email"
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
					<button type="submit" className="button">註冊</button >
				</form>
				<div className="help-text">
				</div>
			</div>
		</>
	);
}