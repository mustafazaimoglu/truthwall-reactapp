import * as actionTypes from "../actions/actionTypes";
import { loggedInCheckService } from "../../services/auth";
import initialState from "./initialState";

export default function loginReducer(state = initialState.loginStatus, action) {
    switch (action.type) {
        case actionTypes.LOGGED_IN_CHECK:
            let newPayload = loggedInCheckService();
            return newPayload;
        default:
            return state;
    }
}
