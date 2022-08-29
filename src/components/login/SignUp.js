import alertify from "alertifyjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/svg/brick-wall.svg";
import av1 from "../../img/user/avatar1.png";
import av2 from "../../img/user/avatar2.png";
import av3 from "../../img/user/avatar3.png";
import av4 from "../../img/user/avatar4.png";
import { useHistory } from "react-router-dom";
import { singUp } from "../../services/auth";
import { connect } from "react-redux";

function SignUp({ loggedIn }) {
    let history = useHistory();
    if (loggedIn.result === "true") {
        history.push("/profile");
    }

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    function signUpForm(event) {
        event.preventDefault();

        if (nickname === "" || password === "" || avatar === "") {
            alertify.error("Please provide all the fields.");
        } else if (nickname.length < 3) {
            alertify.error("Nickname is too short.");
        } else if (password.length < 3) {
            alertify.error("Password is too weak.");
        } else if (nickname.indexOf(" ") >= 0) {
            alertify.error("Nickname shouldn't have white spaces.");
        } else if (password.indexOf(" ") >= 0) {
            alertify.error("Password shouldn't have white spaces.");
        } else {
            singUp(nickname, password, avatar).then((response) => {
                if (response.success) {
                    alertify.success(response.message);
                    alertify.notify("You can log in now!");
                    history.push("/login");
                } else {
                    alertify.error(response.message);
                }
            });
        }
    }

    function inputChangeHandler(event) {
        let tempName = event.target.name;
        let tempValue = event.target.value;
        if (tempName === "nickname") {
            setNickname(tempValue);
        } else if (tempName === "password") {
            setPassword(tempValue);
        } else {
            setAvatar(tempValue);
        }
    }

    return (
        <div>
            <div className="signUp">
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        width="45px"
                        className="mb-5"
                        style={{ marginTop: "1rem" }}
                    />
                </Link>

                <h2 className="mb-3">Create an account</h2>
                <div className="signUpBox">
                    <p className="text-secondary mb-3">
                        Please provide the fields.
                    </p>
                    <form onSubmit={signUpForm}>
                        <div className="mb-3 from-check d-flex justify-content-center align-items-center">
                            <span className="d-flex flex-column justify-content-center align-items-center">
                                <input
                                    type="radio"
                                    id="avatar1"
                                    name="avatar"
                                    value="avatar1"
                                    className="form-check-input"
                                    onChange={inputChangeHandler}
                                />
                                <label htmlFor="avatar1" className="m-2">
                                    <img
                                        src={av1}
                                        alt="avatar1"
                                        width="40px"
                                        className="rounded"
                                    />
                                </label>
                            </span>
                            <span className="d-flex flex-column justify-content-center align-items-center">
                                <input
                                    type="radio"
                                    id="avatar2"
                                    name="avatar"
                                    value="avatar2"
                                    className="form-check-input"
                                    onChange={inputChangeHandler}
                                />
                                <label htmlFor="avatar2" className="m-2">
                                    <img
                                        src={av2}
                                        alt="avatar2"
                                        width="40px"
                                        className="rounded"
                                    />
                                </label>
                            </span>
                            <span className="d-flex flex-column justify-content-center align-items-center">
                                <input
                                    type="radio"
                                    id="avatar3"
                                    name="avatar"
                                    value="avatar3"
                                    className="form-check-input"
                                    onChange={inputChangeHandler}
                                />
                                <label htmlFor="avatar3" className="m-2">
                                    <img
                                        src={av3}
                                        alt="avatar3"
                                        width="40px"
                                        className="rounded"
                                    />
                                </label>
                            </span>
                            <span className="d-flex flex-column justify-content-center align-items-center">
                                <input
                                    type="radio"
                                    id="avatar4"
                                    name="avatar"
                                    value="avatar4"
                                    className="form-check-input"
                                    onChange={inputChangeHandler}
                                />
                                <label htmlFor="avatar4" className="m-2">
                                    <img
                                        src={av4}
                                        alt="avatar4"
                                        width="40px"
                                        className="rounded"
                                    />
                                </label>
                            </span>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                id="nickname"
                                name="nickname"
                                placeholder="Nickname"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div>
                            <button className="signupButton" type="submit">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    Already have an account?
                    <Link
                        to="login"
                        className="text-decoration-none text-warning mx-2"
                    >
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loginReducer,
    };
}

export default connect(mapStateToProps)(SignUp);
