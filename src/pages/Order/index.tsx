import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Loading } from '../../components';
import axios from "axios"
import OrdersInfo from './components/OrderInfo'

interface OrderProps {
}

export const Order: React.FC<OrderProps> = ({ }) => {
	const [loading, setLoading] = useState(false)

	return (
		<>
			<Loading isActive={loading} />
      <OrdersInfo></OrdersInfo>
		</>
	);
}