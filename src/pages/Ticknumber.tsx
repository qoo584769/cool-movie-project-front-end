import React,{useContext} from 'react'
import { OrderContext } from '../stroe';
interface OrderFastProps {

}

export const Ticknumber: React.FC<OrderFastProps> = ({}) => {
    const [state, dispatch] = useContext(OrderContext);
    console.log('state',state)
    return (
        <div>
            <p>{JSON.stringify(state)}</p>
            你要訂幾個座位
        </div>
    );
}