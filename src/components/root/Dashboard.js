import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Route, Switch } from 'react-router-dom';
import MainPage from '../main/MainPage';
import Profile from '../profile/Profile';
import CreatePost from '../post/CreatePost';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/profile" exact component={Profile}/>
                </Switch>
                <CreatePost/>
                <Footer />
            </div>
        )
    }
}

