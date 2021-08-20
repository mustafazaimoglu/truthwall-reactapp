import { Link } from "react-router-dom";
import logo from "../../img/svg/brick-wall.svg";
import plus from "../../img/svg/add.svg";
import UserNav from "../login/UserNav";
import { connect } from "react-redux";
import { popUpControl } from "../../redux/actions/popUpActions";
import { useHistory } from "react-router-dom";
import alertify from "alertifyjs";

function Navbar({ loggedIn, popUp, popUpControl, ...props }) {
    let history = useHistory();
    function createPostPopUp() {
        if (loggedIn.result === "false") {
            alertify.warning("Please log in first!");
            history.push("/login");
        } else {
            popUpControl("block");
        }
    }

    return (
        <div className="tw-main-bg">
            <div style={{ padding: "1.3rem 0" }} className="container">
                <div className="navbarMKZ">
                    <Link to="/" className="text-decoration-none">
                        <div className="d-flex justify-content-center align-items-end">
                            <img src={logo} alt="logo" width="45px" />
                            <span
                                className="sp-font"
                                style={{ marginLeft: "1rem" }}
                            >
                                Truth Wall
                            </span>
                        </div>
                    </Link>

                    <div className="d-flex justify-content-center align-items-center mobileTopMargin">
                        <div
                            id="createPostButton"
                            className="d-flex justify-content-between align-items-center"
                            style={{ marginRight: "1rem" }}
                            onClick={() => {
                                createPostPopUp();
                            }}
                        >
                            <img src={plus} alt="add" width="20px"></img>
                            <span style={{ marginLeft: ".5rem" }}>
                                Create Post
                            </span>
                        </div>
                        <UserNav />
                    </div>
                </div>
                <div className="navline"></div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        popUp: state.popUpReducer,
        loggedIn: state.loginReducer,
    };
}

const mapDispatchToProps = {
    popUpControl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
