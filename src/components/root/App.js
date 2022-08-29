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
    const [counter, setCounter] = useState(15);
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
        fetch("https://truthwall-backend.herokuapp.com");
    }

    async function countDown() {
        for (let index = 14; index >= 0; index--) {
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
            }, 1000);
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
                        <h2>Server is loading...</h2>
                        <h4 className="text-danger">
                            Server is on heroku and it loves sleeping :) so I gotta wake it up!
                            Hold on!
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
