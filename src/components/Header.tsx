import React,{useState} from 'react'
import {  NavLink,useNavigate } from 'react-router-dom';
interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
	const [isLogin, setIsLogin] = useState(false)
	// console.log('isLogin',isLogin)
	const navigate = useNavigate()
	const memberId = JSON.stringify(Math.ceil(Math.random() * 10000000))
	const clickHandler = () =>{
		setIsLogin(state=>!state)
		if(isLogin){
			navigate("/")
		}
	}
	return (
		<nav className="navbar bg-light">
			<form className="container-fluid justify-content-end">
				
				{isLogin? (
					<>
						<NavLink className="nav-link" to={`/member/${memberId}`}><i className=" bi-person-circle me-2 btn-outline-success" ></i></NavLink>
						<span className='me-3'>歡迎Ellson登入</span>
					</>
				): ""}
				
				<button className="btn btn-sm btn-outline-success me-2" type="button" onClick={clickHandler}>
					{isLogin?"登出":"註冊 / 登入"}
				</button>
			</form>
		</nav>

	);
}
