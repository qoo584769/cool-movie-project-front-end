import React,{useContext,useEffect} from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../stroe/store';

interface OrderFormProps {
}

export interface OrderFormType  {
    moviename: string,
    moviedate:string,
    moviesize:string
    movietime:string
};

export const HomeOrderForm: React.FC<OrderFormProps> = ({}) => {
  const [state, dispatch] = useContext(OrderContext);
  // console.log('state',state)
    const { register, handleSubmit } = useForm<OrderFormType>();
    const navigate = useNavigate()
    
    useEffect(()=>{
      dispatch({
        type:"CLEAR_ORDER",
      })
    },[dispatch])

    const onSubmit = (data: OrderFormType) => {
      dispatch({
        type:"ADD_ORDER_FROM_HOME",
        payload:{
          ...data,
          moviename:JSON.parse(data.moviename).moviename,
          moviesize:JSON.parse(data.moviename).moviesize
        }
      })
      navigate("/ticknumber")
      // 在此處處理提交表單
    };
    return (
        <div className='container mt-2'>
        <div className="row">
          <div className="col-md-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <select {...register("moviename")}>
              <option value={JSON.stringify({ moviename: "厲陰宅", moviesize: "normal" })}>(數位)厲陰宅</option>
              <option value={JSON.stringify({ moviename: "陰兒房", moviesize: "IMAX" })}>(TITAN)陰兒房</option>
              <option value={JSON.stringify({ moviename: "蝙蝠俠", moviesize: "normal" })}>(數位)蝙蝠俠</option>
              </select>
              <select {...register("moviedate")} >
                <option value="">選擇日期</option>
                <option value="2023/4/15(六)">2023/4/15(六)</option>
                <option value="2023/4/20(四)">2023/4/20(四)</option>
                <option value="2023/4/30(日)">2023/4/30(日)</option>
              </select>
              <select {...register("movietime")} >
                <option value="">選擇場次</option>
                <option value="2:30">2:30</option>
                <option value="3:30">3:30</option>
                <option value="1:20">1:20</option>
              </select>
              <button type="submit">開始訂票</button>
            </form>
          </div>
        </div>
      </div>
    );
}