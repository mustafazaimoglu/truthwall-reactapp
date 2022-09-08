import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../img/svg/brick-wall.svg";
import { login } from "../../services/auth";
import alertify from "alertifyjs";
import { loggedInCheck } from "../../redux/actions/loginActions";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ loggedIn, loggedInCheck }) {
    let history = useHistory();
    if (loggedIn.result === true) {
        history.push("/profile");
    }

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    function loginForm(event) {
        event.preventDefault();
        if (nickname === "" || password === "") {
            alertify.error("Please provide all the fields");
        } else {
            login(nickname, password).then((response) => {
                if (response.result === true) {
                    alertify.success("Login Success");
                    loggedInCheck();                    
                } else {
                    alertify.error("Password or Nickname is wrong!");
                }
            });
        }
    }

    function inputChangeHandler(event) {
        let tempName = event.target.name;
        let tempValue = event.target.value;
        if (tempName === "nickname") {
            setNickname(tempValue);
        } else {
            setPassword(tempValue);
        }
    }

    return (
        <div>
            <div className="login">
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        width="45px"
                        className="mb-5"
                        style={{ marginTop: "-2rem" }}
                    />
                </Link>
                <h2 className="mb-4">Log in</h2>
                <div className="loginBox">
                    <p className="text-secondary mb-4">
                        Enter your nickname and password.
                    </p>
                    <form onSubmit={loginForm}>
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
                            <button className="loginButton" type="submit">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    Don’t have an account yet?
                    <Link
                        to="signup"
                        className="text-decoration-none text-warning mx-2"
                    >
                        Sign up
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

const mapDispatchToProps = {
    loggedInCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
