import { apiPath, apiPath2 } from "../../constants/ApiPath";
import { getToken } from "../../services/tokenService";
import * as actionTypes from "./actionTypes";

export function getAllUserInfosSuccess(payload) {
    return {
        type: actionTypes.GET_ALL_USERINFOS_SUCCESS,
        payload: payload,
    };
}

export function getAllUserInfos() {
    let path = apiPath + "userInfo";
    return function (dispatch) {
        return fetch(path)
            .then((response) => response.json())
            .then((data) => dispatch(getAllUserInfosSuccess(data)));
    };
}

export function getUserPostsSuccess(payload) {
    console.log(payload);
    return {
        type: actionTypes.GET_USER_POSTS_SUCCESS,
        payload: payload,
    };
}

export function getUserPosts(userId) {
    let path = apiPath2 + "posts/getPostsByUserId?userId=" + userId;
    return function (dispatch) {
        return fetch(path, {
            headers: { Authorization: "Bearer " + getToken() },
        })
            .then((response) => response.json())
            .then((data) => dispatch(getUserPostsSuccess(data)));
    };
}
