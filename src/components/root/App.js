/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFound from "../common/NotFound";
import Login from "../login/Login";
import SignUp from "../login/SignUp";
import Dashboard from "./Dashboard";
import { loggedInCheck } from "../../redux/actions/loginActions";
import { useEffect } from "react";

function App({ loggedInCheck }) {
    useEffect(() => {
        loggedInCheck();
    },[]);

    return (
        <div className="tw-soft-bg">
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/profile" exact component={Dashboard} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route component={NotFound} />
            </Switch>
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
