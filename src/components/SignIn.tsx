import React, { useState, MutableRefObject, Dispatch, SetStateAction, useContext } from 'react'
import { OrderContext } from '../store';
import { useForm, useWatch } from "react-hook-form"
import { authFetch } from '../utilities';
import { Loading } from './';
import { CatchErrorMessage } from '../interface/member';

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
	const { register, handleSubmit, control, getValues, setError, formState: { errors } } = useForm<SignInType>();
	const watchForm = useWatch({ control });

	const loginForm = (data: SignInType) => {
		(async function () {
			try {
				setloading(true)
				const response = await authFetch.post('/api/member/signin', {
					email: data.useremail,
					password: data.password
				})
				console.log(' response=> ', response)
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
				setloading(false)
				setIsLogin(true)

			} catch (error) {
				setloading(false)
				const CatchErrorMessage = error as CatchErrorMessage
				if (CatchErrorMessage.response.status === 404) {
					const errorMessage = CatchErrorMessage.response.data?.message;
					if (errorMessage.includes('帳號不存在')) {
						setError("useremail", {
							type: "serverError",
							message: errorMessage
						});

					} else if (errorMessage.includes('密碼錯誤')) {
						setError("password", {
							type: "serverError",
							message: errorMessage,
						});
					}
				}
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
						className={`input ${errors.useremail && 'is-invalid'}`}
						id="user_login"
						autoComplete="off"
						placeholder="Email"
						{...register("useremail", {
							required: {
								value: true,
								message: '請輸入您的email',
							},
							pattern: {
								value: /^\S+@\S+$/i,
								message: '您的email格式不正確',
							},
						})}
					/>
					{errors.useremail && (
						<div className="invalid-feedback">{errors?.useremail?.message}</div>
					)}
					<input
						type="password"
						className={`input ${errors.password && 'is-invalid'}`}
						id="user_pass"
						autoComplete="off"
						placeholder="Password"
						{...register("password", {
							required: {
								value: true,
								message: '請輸入密碼',
							},
						})}
					/>
					{errors.password && (
						<div className="invalid-feedback">{errors?.password?.message}</div>
					)}
					{/* <input type="checkbox" className="checkbox" id="remember_me" />
					<label htmlFor="remember_me" className='remember_me'>記住我</label> */}
					<button type="submit" className="button">登入</button >
				</form>
				<div className="help-text">
					{/* <p><a href="#">忘記密碼</a></p> */}
				</div>
			</div>
		</>
	);
}