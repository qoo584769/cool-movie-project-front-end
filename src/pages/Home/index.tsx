import React, { useState, useEffect } from 'react'
import { HomeOrderForm } from './components/HomeOrderForm';
import { HomeCarousel } from './components/HomeCarousel';
import { HomeReleased } from './components/HomeReleased';
import { HomeComimgMovie } from './components/HomeComimgMovie';
import { HomeHotMovie } from './components/HomeHotMovie';
import { HomeDiscount } from './components/HomeDiscount';
import { HomeCallToAction } from './components/HomeCallToAction';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/index';

// const api = 'https://api.unsplash.com/search/photos/';
// const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS

interface HomeProps {
}

export interface MovieDataType {
	id: string,
	urls: {
		raw: string
	}
}

export const Home: React.FC<HomeProps> = ({ }) => {
	const [list, setList] = useState<MovieDataType[]>([])
	const [loading, setloading] = useState(false)

	useEffect(() => {
	}, [])

	return (
		<>
				<Loading isActive={loading} />
				<HomeCarousel />
				{/* <HomeOrderForm /> */}
				<HomeReleased />
				<HomeComimgMovie />
				<HomeHotMovie />
				<HomeDiscount />
				<HomeCallToAction />
				<div className="container">
					<div className="row mt-4">
					</div>
					{/* <div className="row">
						{list.map((item) => {
							return (
								<div className="col p-1" key={item.id}>
									<Link to={`/movie/${item.id}`}>
										<div className="card">
											<img className="card-img-top" style={{ width: "100%", height: "400px" }} src={`${item.urls.raw}&w=700&q=80`} alt="..." />
											<div className="card-body">
												<h5 className="card-title">Card title</h5>
											</div>
										</div>
									</Link>
								</div>
							)
						})}
					</div> */}
				</div>
		</>
	);
}