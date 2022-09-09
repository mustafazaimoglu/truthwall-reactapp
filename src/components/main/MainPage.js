/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostCard from "../post/PostCard";
import { getPosts, getPostsUserMode } from "../../redux/actions/postActions";
import LoadingSpinner from "../common/LoadingSpinner";

function MainPage({ loggedIn, getPosts, getPostsUserMode, posts }) {
    useEffect(() => {
        if (loggedIn.result === false) {
            getPosts();
        } else {
            getPostsUserMode(loggedIn.data.id);
        }
    }, [loggedIn]);

    function colmd7(payload) {
        return (
            <div className="col-md-7">
             {/* <div className="col-md-6"> */}
                <PostCard post={payload} />
            </div>
        );
    }
    function colmd5(payload) {
        return (
            <div className="col-md-5">
            {/* <div className="col-md-6"> */}
                <PostCard post={payload} />
            </div>
        );
    }

    function renderPosts() {
        let result = [];
        let toggle = false;

        if (posts !== undefined) {
            for (let index = 0; index < posts.length; index++) {
                let row;
                if (toggle === true) {
                    toggle = false;
                } else {
                    toggle = true;
                }

                if (toggle === true) {
                    row = (
                        <div className="row" key={index}>
                            {posts[index] !== undefined
                                ? colmd7(posts[index])
                                : ""}
                            {posts[index + 1] !== undefined
                                ? colmd5(posts[index + 1])
                                : ""}
                        </div>
                    );
                } else {
                    row = (
                        <div className="row" key={index}>
                            {posts[index] !== undefined
                                ? colmd5(posts[index])
                                : ""}
                            {posts[index + 1] !== undefined
                                ? colmd7(posts[index + 1])
                                : ""}
                        </div>
                    );
                }

                result.push(row);
                index++;
            }
        } else {
            return <LoadingSpinner/>
        }
    

        return result;
    }

    return (
        <div>
            <div className="container-lg mainMarginMinus">{renderPosts()}</div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        posts: state.postListReducer.data,
        users: state.userReducer,
        loggedIn: state.loginReducer,
    };
}

const mapDispatchToProps = {
    getPosts,
    getPostsUserMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
