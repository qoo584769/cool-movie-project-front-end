import { createContext, useReducer, Dispatch } from "react";

export interface IsLoginState {
  isLogin:boolean
}

export const loginContext = createContext({});

export const isLoginContext = createContext<any>({
  isLogin:false,
})

export const isLoginInitialState:IsLoginState = {
  isLogin:false
}

export const isLoginReducer = (state:any, action:any)=>{
  switch (action.type) {
    case 'YES':
      state.isLogin = action.value
      return state;
      case 'NO':
        state.isLogin = action.value
      return state;
    default:
      return state
  }
}

