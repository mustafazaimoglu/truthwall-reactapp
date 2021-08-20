import { properTime } from "./time";

export const loggedInCheckService = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    let result;

    if (userData) {
        result = {
            result: "true",
            data: userData,
        };
    } else {
        result = {
            result: "false",
            data: "-",
        };
    }

    return result;
};

export const login = async (nickname, password) => {
    let userId;
    await matchLoginDatas(nickname, password)
        .then((id) => {
            userId = id;
        })
        .catch((err) => {
            userId = err;
        });

    if (userId !== -1) {
        await getUserInfo(userId).then((userData) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: userData.userId,
                    nickname: userData.nickname,
                    accountCreationDate: userData.accountCreationDate,
                    avatar: userData.avatar,
                })
            );
        });
    }

    let loggedIn = loggedInCheckService();
    return loggedIn;
};

export const matchLoginDatas = (nickname, password) => {
    return new Promise((resolve, reject) => {
        fetch(
            "https://my-json-server.typicode.com/mustafazaimoglu/truthwallserver/users"
        )
            .then((response) => response.json())
            .then((data) => {
                data.forEach((d) => {
                    if (d.nickname === nickname) {
                        if (d.password === password) {
                            resolve(d.id);
                        }
                    }
                });
                reject(-1);
            });
    });
};

export const getUserInfo = (userId) => {
    return new Promise((resolve) => {
        let url =
            "https://my-json-server.typicode.com/mustafazaimoglu/truthwallserver/userInfo?userId=" +
            userId;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                resolve(data[0]);
            });
    });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const singUp = async (nickname, password, avatar) => {
    let tempData;
    let tempLastData;

    await singUpDatas(nickname, password).then((userData) => {
        tempData = userData;
    });

    await singUpInfoDatas(tempData, avatar).then((lastData) => {
        tempLastData = lastData;
    });

    return tempLastData;
};

export const singUpDatas = async (nickname, password) => {
    return new Promise((resolve, reject) => {
        fetch(
            "https://my-json-server.typicode.com/mustafazaimoglu/truthwallserver/users",
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    nickname: nickname,
                    password: password,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            });
    });
};

export const singUpInfoDatas = async (data, avatar) => {
    return new Promise((resolve, reject) => {
        fetch(
            "https://my-json-server.typicode.com/mustafazaimoglu/truthwallserver/userInfo",
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    nickname: data.nickname,
                    avatar: avatar,
                    accountCreationDate: properTime(),
                    userId: data.id,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            });
    });
};
