import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import axios from 'axios'
import useLocalStorage from 'use-local-storage';
import authFetch from '../utilities/authFetch';
import * as bootstrap from 'bootstrap';


interface LoginProps {

}

interface LoginType {
	useremail: string,
	password: string
}

export const Login: React.FC<LoginProps> = ({ }) => {
	const [currentTab, setCurrentTab] = useState('login')
	const { register, handleSubmit } = useForm<LoginType>();
	const modalRef = useRef<HTMLDivElement | null>(null);
	const myModal = useRef<bootstrap.Modal | null>(null);

	useEffect(() => {
		myModal.current = new bootstrap.Modal(modalRef.current as HTMLElement);
	}, []);

	const loginForm = (data: LoginType) => {
		(async function () {
			try {
				let response = await authFetch.post('/users/sign_in', {
					email: data.useremail,
					password: data.password
				})
				console.log('response', response)
				myModal.current?.hide();
				document.querySelector(".modal-backdrop")?.remove();
			} catch (error) {
				console.log('error', error);
			}
		}())
	}

	return (
		<>
			<button type="button" className="btn btn-sm btn btn-outline-warning me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				登入/註冊
			</button>
			<div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabIndex={-1} ref={modalRef}>
				<div className="modal-dialog">
					<div className="modal-content modelWrap">
						<div className="modal-body">
							<div className="form-wrap">
								<i className="bi bi-x" data-bs-dismiss="modal"></i>
								<div className="tabs">
									<h6 className="login-tab">
										<button
											type='button'
											onClick={() => setCurrentTab('login')}
											style={{ "backgroundColor": (currentTab === "login") ? "#E7C673" : " rgba(55, 55, 55, 0)" }}>
											登入
										</button>
									</h6>
									<h6 className="signup-tab">
										<button
											type='button'
											onClick={() => setCurrentTab('signup')}
											style={{ "backgroundColor": (currentTab === "signup") ? "#E7C673" : "rgba(55, 55, 55, 0)" }}>
											註冊
										</button>
									</h6>
								</div>
								<div className="tabs-content">
									{currentTab === 'login' ? (
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
												<input type="submit" className="button" value="登入" />
											</form>
											<div className="help-text">
												{/* <p><a href="#">忘記密碼</a></p> */}
											</div>
										</div>
									) : (
										<div id="signup-tab-content">
											<form className="signup-form" action="" method="post">
												<input type="email" className="input" id="user_email" autoComplete="off" placeholder="Email" />
												<input type="text" className="input" id="user_name" autoComplete="off" placeholder="Username" />
												<input type="password" className="input" id="user_pass" autoComplete="off" placeholder="Password" />
												<input type="submit" className="button" value="註冊" />
											</form>
											<div className="help-text">
											</div>
										</div>
									)}
								</div>
								{/* <button type="button" className="btn-close" data-bs-dismiss="modal"></button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>)
}