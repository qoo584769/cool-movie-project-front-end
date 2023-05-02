import React, { useState, useRef, useEffect, Dispatch, SetStateAction, useContext } from 'react'
import * as bootstrap from 'bootstrap';
import { SingIn, SignUp } from './';
interface LoginProps {
	isLogin: boolean
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

export const Login: React.FC<LoginProps> = ({ isLogin, setIsLogin }) => {
	const [currentTab, setCurrentTab] = useState('login')
	const modalRef = useRef<HTMLDivElement | null>(null);
	const myModal = useRef<bootstrap.Modal | null>(null);
	let openModal = () => {
		myModal?.current?.show()
	}
	useEffect(() => {
		myModal.current = new bootstrap.Modal(modalRef.current as HTMLElement);
	}, []);

	return (
		<>
			<button type="button" className="btn btn-sm btn btn-outline-warning me-2" onClick={openModal}>
				登入 / 註冊
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
										<SingIn myModal={myModal} setIsLogin={setIsLogin} />
									) : (
										<SignUp myModal={myModal} setIsLogin={setIsLogin} />
									)
									}
								</div>
								{/* <button type="button" className="btn-close" data-bs-dismiss="modal"></button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>)
}