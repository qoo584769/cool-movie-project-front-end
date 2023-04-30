import { Dispatch } from "react";
import { OrderAction } from "../stroe";

export const logoutClear = (dispatch: Dispatch<OrderAction>) => {
    localStorage.removeItem("userToken")
    dispatch({
        type: "CLEAR_ORDER",
        payload: {
            memberId: null,
            status: "quick",
            mamberName: "",
        }
    })
}