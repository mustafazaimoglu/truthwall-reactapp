import { properTime } from "../../services/time";
import * as actionTypes from "./actionTypes";

export function createPostSuccess(payload) {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        payload: payload,
    };
}

export function getPostsSuccess(payload) {
    let newPayload = payload.reverse();
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        payload: newPayload,
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

export function createPost(post) {
    return function (dispatch) {
        return fetch("http://localhost:3000/posts", {
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

export function getPosts() {
    return function (dispatch) {
        return fetch("http://localhost:3000/posts")
            .then((response) => response.json())
            .then((data) => dispatch(getPostsSuccess(data)));
    };
}

export function updatePost(post) {
    let url = "http://localhost:3000/posts/" + post.id;
    return function (dispatch) {
        return fetch(url, {
            method: "PUT",
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
    let url = "http://localhost:3000/posts/" + id;
    return function (dispatch) {
        return fetch(url, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => dispatch(deletePostSuccess(data)));
    };
}
