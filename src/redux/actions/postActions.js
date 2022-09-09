import { apiPath } from "../../constants/ApiPath";
import { getToken } from "../../services/tokenService";
import * as actionTypes from "./actionTypes";

export function getPostsSuccess(payload) {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        payload: payload,
    };
}

export function getPosts() {
    let path = apiPath + "posts/getAllDto";
    return function (dispatch) {
        return fetch(path)
            .then((response) => response.json())
            .then((data) => {
                dispatch(getPostsSuccess(data));
            });
    };
}

export function getPostsUserMode(userId) {
    let path = apiPath + "posts/getAllDtoUserMode?userId=" + userId;
    return function (dispatch) {
        return fetch(path)
            .then((response) => response.json())
            .then((data) => {
                dispatch(getPostsSuccess(data));
            });
    };
}

export function createPost(post) {
    let path = apiPath + "posts/save";
    return new Promise((resolve, reject) => {
        return fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
            body: JSON.stringify({
                message: post.message,
                userId: post.userId,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject("Internal Server Error");
            });
    });
}

export function updatePost(post) {
    let path = apiPath + "posts/save";
    return new Promise((resolve, reject) => {
        return fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
            body: JSON.stringify({
                postId: post.postId,
                message: post.message,
                userId: post.userId,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject("Internal Server Error");
            });
    });
}

export function deletePost(id) {
    let path = apiPath + "posts/delete?id=" + id;
    return new Promise((resolve, reject) => {
        return fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        })
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject("Internal Server Error");
            });
    });
}
