export function getToken() {
    let userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
        return userData.token;
    } else {
        return null;
    }
    
}