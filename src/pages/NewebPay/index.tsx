import React, { MutableRefObject, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../components';
import NewebPayInfo from './components/NewebPayInfo'

interface NewebPayReturn {
}

export const NewebPay: React.FC<NewebPayReturn> = ({ }) => {
	const [loading, setLoading] = useState(false)

	return (
		<>
			<Loading isActive={loading} />
      <NewebPayInfo></NewebPayInfo>
		</>
	);
}

