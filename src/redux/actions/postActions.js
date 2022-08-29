import { apiPath, apiPath2 } from "../../constants/ApiPath";
import { properTime } from "../../services/time";
import * as actionTypes from "./actionTypes";

export function createPostSuccess(payload) {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        payload: payload,
    };
}

export function getPostsSuccess(payload) {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        payload: payload,
    };
}

export function updatePostSuccess(payload) {
    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
        payload: payload,
    };
}

export function deletePostSuccess(payload) {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        payload: payload,
    };
}

export function getPosts() {
    let path = apiPath2 + "posts/getAllDto";
    return function (dispatch) {
        return fetch(path)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dispatch(getPostsSuccess(data));
            });
    };
}

export function createPost(post) {
    let path = apiPath + "posts";
    return function (dispatch) {
        return fetch(path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                message: post.message,
                userId: post.userId,
                postDate: properTime(),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(createPostSuccess(data));
            });
    };
}

export function updatePost(post) {
    let path = apiPath + "posts/" + post.id;
    return function (dispatch) {
        return fetch(path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                message: post.message,
                userId: post.userId,
                postDate: properTime(),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(updatePostSuccess(data));
            });
    };
}

export function deletePost(id) {
    let path = apiPath + "posts/" + id;
    return function (dispatch) {
        return fetch(path, {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => dispatch(deletePostSuccess(data)));
    };
}
