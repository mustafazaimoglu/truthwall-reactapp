import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function userPostReducer(state = initialState.userPosts, action) {
    switch (action.type) {
        case actionTypes.GET_USER_POSTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}