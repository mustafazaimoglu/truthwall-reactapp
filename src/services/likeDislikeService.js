import { apiPath } from "../constants/ApiPath";
import { getToken } from "./tokenService";

export const likePost = (postId, userId) => {
    let path =
        apiPath + `likes-dislikes/likePost?postId=${postId}&userId=${userId}`;
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
};

export const unlikePost = (postId, userId) => {
    let path =
        apiPath + `likes-dislikes/unlikePost?postId=${postId}&userId=${userId}`;
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
};

export const dislikePost = (postId, userId) => {
    let path =
        apiPath +
        `likes-dislikes/dislikePost?postId=${postId}&userId=${userId}`;
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
};

export const undislikePost = (postId, userId) => {
    let path =
        apiPath +
        `likes-dislikes/undislikePost?postId=${postId}&userId=${userId}`;
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
};

export const undislikeAndLikePost = (postId, userId) => {
    let path =
        apiPath +
        `likes-dislikes/undislikeAndLikePost?postId=${postId}&userId=${userId}`;
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
};

export const unlikeAndDislikePost = (postId, userId) => {
    let path =
        apiPath +
        `likes-dislikes/unlikeAndDislikePost?postId=${postId}&userId=${userId}`;
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getToken(),
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
};
