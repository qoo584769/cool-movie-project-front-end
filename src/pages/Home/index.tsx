import React, { useState, useEffect } from 'react'
import { HomeOrderForm } from './components/HomeOrderForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../components'; 

const api = 'https://api.unsplash.com/search/photos/';
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS

interface HomeProps {
}

export interface MovieDataType {
	id: string,
	urls:{
		raw:string
	}
}

export const Home: React.FC<HomeProps> = ({ }) => {
	const [list, setList] = useState<MovieDataType[]>([])
	const [loading, setloading] = useState(false)
	
	useEffect(() => {
		(async function () {
			setloading(true)
			try {
				let response = await axios.get(`${api}?client_id=${accessKey}&query=movie poster&page=1&per_page=3`);
				const { results } = response.data
				setList(results)
				setloading(false)
			} catch (error) {
			}
		}())
	}, [])

	return (
		<>
			<Loading isActive={loading}/>
			<HomeOrderForm />
			<div className="container">
				<div className="row mt-4">
				</div>
					<div className="row">
						{list.map((item)=>{
								return(
								<div className="col p-1" key={item.id}>
									<Link to={`/movie/${item.id}`}>
										<div className="card">
											<img className="card-img-top" style={{width:"100%",height:"400px"}} src={`${item.urls.raw}&w=700&q=80`} alt="..."/>
											<div className="card-body">
												<h5 className="card-title">Card title</h5>
											</div>
										</div>
									</Link>
								</div>
								)
						})}
					</div>
			</div>
		</>
	);
}