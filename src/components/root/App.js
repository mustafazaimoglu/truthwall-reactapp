/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFound from "../common/NotFound";
import Login from "../login/Login";
import SignUp from "../login/SignUp";
import Dashboard from "./Dashboard";
import { loggedInCheck } from "../../redux/actions/loginActions";
import { useEffect, useState } from "react";

function App({ loggedIn, loggedInCheck }) {
    const [serverStatus, setServerStatus] = useState(null);
    const [counter, setCounter] = useState(10);
    const [control] = useState(0);
    useEffect(() => {
        loggedInCheck();
        isAPIawake();
    }, [control]);

    function isAPIawake() {
        let status = sessionStorage.getItem("server");

        if (status !== null) {
            setServerStatus("true");
        } else {
            serverWaker();
            countDown();
        }
    }

    function serverWaker() {
        fetch("https://truthwallserver.herokuapp.com");
    }

    async function countDown() {
        for (let index = 9; index >= 0; index--) {
            await countDownValueChanger(index);
        }
        sessionStorage.setItem("server", "true");
        setServerStatus("true");
    }

    function countDownValueChanger(value) {
        return new Promise((resolve) => {
            setTimeout(() => {
                setCounter(value);
                resolve();
            }, 1050); // to gain some time I do not want to change 10 seconds so this equals 10.5 sec
        });
    }

    return (
        <div className="tw-soft-bg">
            {serverStatus === null ? (
                <div className="serverLoading">
                    <div
                        className="p-2 text-center"
                        style={{ marginTop: "-2.5rem" }}
                    >
                        <div>
                            <h1 className="mb-2" style={{ fontSize: "3rem" }}>
                                {'"' + counter + '"'}
                            </h1>
                        </div>
                        <h2>Mock server is loading...</h2>
                        <h4 className="text-danger">
                            Do not forget this is a mock server after couple
                            hours everything you have done will be vanished.
                        </h4>
                    </div>
                </div>
            ) : (
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/profile" exact component={Dashboard} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route component={NotFound} />
                </Switch>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
