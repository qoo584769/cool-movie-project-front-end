import { createContext,useReducer, Dispatch } from "react";
import { OrderFormType } from "../components";

// 定義我們的狀態型別
export interface OrderType extends OrderFormType {
    movieIsOnId:string
    movie_time:string,
    quantity: number,
    seat_remain?:[] 
    seat_remain_number?:number
    seat_ordered?:[]
}

export interface OrderState {
    orderList: OrderType;
    total:number
}


// 定義操作型別
export interface OrderAction {
    type: string;
    payload?: any;
}

// 建立我們的 Context
export const OrderInitialState: OrderState = { 
    orderList: {movieIsOnId:"",movie_name:"",movie_date:"",movie_time:"",movie_size:"",quantity:1},
    total:0 
}

export type OrderContextType = [OrderState, Dispatch<OrderAction>];

export const OrderContext = createContext<OrderContextType>([OrderInitialState, () => {}])

export function OrderReducer(state: OrderState, action: OrderAction) {
    // const orderList = [...state.orderList]
    // console.log('action.payload',action.type)
    // console.log('state',state)

    switch (action.type) {
      case 'CLEAR_ORDER':
      return {
        ...state,
        orderList:{movieIsOnId:"",moviename:"",moviedate:"",movietime:"",moviesize:"",quantity:1}
      };

      case 'ADD_ORDER_FROM_HOME':

        return {
          ...state,
          orderList: action.payload,
        };
      default:
        return state;
    }
}