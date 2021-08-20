export const properTime = () => {
    let result;
    let mkz = new Date();

    result =
        mkz.getDate() +
        "/" +
        (mkz.getMonth() + 1) +
        "/" +
        mkz.getFullYear() +
        " " +
        (mkz.getHours() < 10 ? "0" + mkz.getHours() : mkz.getHours()) +
        ":" +
        (mkz.getMinutes() < 10 ? "0" + mkz.getMinutes() : mkz.getMinutes());

    return result;
};
