import { apiPath } from "../../constants/ApiPath";
import { getToken } from "../../services/tokenService";
import * as actionTypes from "./actionTypes";

export function getUserPostsSuccess(payload) {
    return {
        type: actionTypes.GET_USER_POSTS_SUCCESS,
        payload: payload,
    };
}

export function getUserPosts(userId) {
    let path = apiPath + "posts/getPostsByUserId?userId=" + userId;
    return function (dispatch) {
        return fetch(path, {
            headers: { Authorization: "Bearer " + getToken() },
        })
            .then((response) => response.json())
            .then((data) => dispatch(getUserPostsSuccess(data)));
    };
}
