import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loggedInCheck } from "../../redux/actions/loginActions";
import { logout } from "../../services/auth";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";

function UserNav({loggedIn, loggedInCheck}) {
    let history = useHistory();
    function logoutFunction(){
        logout();
        loggedInCheck();
        history.push("/")
        alertify.success("Logged out!")
    }

    function renderLoggedIn() {
        return (
            <div className="dropdown">
                <img src={"./img/avatars/" + loggedIn.data.avatar + ".png"} alt="userLogo" className="dropimg"></img>
                <div className="dropdown-content">
                    <div>{loggedIn.data.nickname}</div>
                    <hr style={{ color: "black", margin: "0" }}></hr>
                    <div>
                        <Link
                            to="/profile"
                            className="text-decoration-none text-dark"
                        >
                            Profile
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/"
                            className="text-decoration-none text-danger"
                            onClick={() => {
                                logoutFunction();
                            }}
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    function renderNotLoggedIn() {
        return (
            <div className="d-flex justify-content-center align-items-center ">
                <Link to="/login" className="text-decoration-none">
                    <div id="userNavLoginButton">Login</div>
                </Link>
                <Link to="/signup" className="text-decoration-none mx-3">
                    <div id="userNavLoginButton">Sign up</div>
                </Link>
            </div>
        );
    }

    return <div>{loggedIn.result === false ? renderNotLoggedIn() : renderLoggedIn()}</div>;
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loginReducer,
    };
}

const mapDispatchToProps = {
    loggedInCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
