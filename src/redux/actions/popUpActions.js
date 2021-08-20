import * as actionTypes from "./actionTypes";

export function popUpControl(payload){
    return {
        type: actionTypes.POP_UP_CONTROL,
        payload: payload,
    };
}