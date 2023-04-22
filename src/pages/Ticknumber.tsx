import React, { useContext } from 'react'
import { OrderContext } from '../stroe';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
interface OrderFastProps {

}

export const Ticknumber: React.FC<OrderFastProps> = ({}) => {
    const [state, dispatch] = useContext(OrderContext);
    const { register, handleSubmit } = useForm<TickNumberType>();
	const navigate = useNavigate()
	interface TickNumberType {
		tickNum: number
	}

	const onSubmit = (data: TickNumberType) => {
		navigate(`/chooseSeates/${(data.tickNum)}`);
	}
    console.log('state',state)
    return (
        <div>
            <p>{JSON.stringify(state)}</p>
            你要訂幾個座位
            <form onSubmit={handleSubmit(onSubmit)}>
				<select
					{...register("tickNum", {
						setValueAs: (value) => parseInt(value, 10),
					})}
				>
					{[...Array(5)].map((__, index) => {
						return (
							<option value={index + 1} key={index}>{index + 1}</option>
						)
					})}
				</select>
				<button type='submit'>確定</button>
			</form>
        </div>
    );
}