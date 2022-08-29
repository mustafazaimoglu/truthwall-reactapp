export function getToken() {
    let userData = JSON.parse(localStorage.getItem("user"));
    return userData.token;
}