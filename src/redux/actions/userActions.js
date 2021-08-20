import * as actionTypes from "./actionTypes";

export function getAllUserInfosSuccess(payload) {
    return {
        type: actionTypes.GET_ALL_USERINFOS_SUCCESS,
        payload: payload,
    };
}

export function getAllUserInfos() {
    return function (dispatch) {
        return fetch("http://localhost:3000/userInfo")
            .then((response) => response.json())
            .then((data) => dispatch(getAllUserInfosSuccess(data)));
    };
}

export function getUserPostsSuccess(payload) {
    let newPayload = payload.reverse();
    return {
        type: actionTypes.GET_USER_POSTS_SUCCESS,
        payload: newPayload,
    };
}

export function getUserPosts(userId) {
    let url = "http://localhost:3000/posts?userId=" + userId;
    return function (dispatch) {
        return fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch(getUserPostsSuccess(data)));
    };
}