import * as actionTypes from "./actionTypes";

export function loggedInCheck(status) {
    return {
        type: actionTypes.LOGGED_IN_CHECK,
        payload: status,
    };
}