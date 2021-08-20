import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function popUpReducer(state = initialState.popUp, action){
    switch (action.type) {
        case actionTypes.POP_UP_CONTROL:
            return action.payload;
        default:
            return state;
    }
}