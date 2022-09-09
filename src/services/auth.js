import { apiPath } from "../constants/ApiPath";

export const loggedInCheckService = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    let result;

    if (userData) {
        result = {
            result: true,
            data: userData,
        };
    } else {
        result = {
            result: false,
            data: "-",
        };
    }

    return result;
};

export const login = async (nickname, password) => {
    await loginHandler(nickname, password)
        .then((data) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.userId,
                    nickname: data.username,
                    accountCreationDate: data.accountCreationDate,
                    avatar: data.avatar,
                    token: data.token,
                })
            );
        })
        .catch((err) => {
            console.log(err.message);
        });

    let loggedIn = loggedInCheckService();
    return loggedIn;
};

export const loginHandler = (nickname, password) => {
    let path = apiPath + "auth/login";
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: nickname,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data.data);
                } else {
                    reject(data);
                }
            });
    });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const singUp = async (nickname, password, avatar) => {
    let data;
    await signUpHandler(nickname, password, avatar)
        .then((res) => {
            data = res;
        })
        .catch((err) => {
            data = err;
        });
    return data;
};

export const signUpHandler = async (nickname, password, avatar) => {
    let path = apiPath + "auth/register";
    return new Promise((resolve, reject) => {
        fetch(path, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: nickname,
                password: password,
                avatar: avatar,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    resolve(data);
                }
                reject({
                    message: "Username already exists!",
                    success: false,
                });
            });
    });
};
