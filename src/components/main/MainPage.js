import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostCard from "../post/PostCard";
import { getPosts } from "../../redux/actions/postActions";
import { getAllUserInfos } from "../../redux/actions/userActions";

function MainPage({ getPosts, posts,users,getAllUserInfos }) {
    useEffect(() => {
        if (posts.length === 0) {
            getPosts();
        }

        if(users.length === 0){
            getAllUserInfos();
        }
    });

    function postOwnerFinder(post)
    {
        let temp;
        users.forEach(u => {
            if (u.userId === post.userId)
            {
                temp = u;
            }
        });
        return temp;
    }

    function colmd7(payload) {

        let user = postOwnerFinder(payload)
        // console.log(user);

        return (
            <div className="col-md-7">
                <PostCard post={payload} user={user}/>
            </div>
        );
    }
    function colmd5(payload) {

        let user = postOwnerFinder(payload)

        return (
            <div className="col-md-5">
                <PostCard post={payload} user={user}/>
            </div>
        );
    }

    function renderPosts() {
        let result = [];
        let toggle = false;
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
                        {posts[index] !== undefined ? colmd7(posts[index]) : ""}
                        {posts[index + 1] !== undefined
                            ? colmd5(posts[index + 1])
                            : ""}
                    </div>
                );
            } else {
                row = (
                    <div className="row" key={index}>
                        {posts[index] !== undefined ? colmd5(posts[index]) : ""}
                        {posts[index + 1] !== undefined
                            ? colmd7(posts[index + 1])
                            : ""}
                    </div>
                );
            }

            result.push(row);
            index++;
        }

        return result;
    }

    return (
        <div>
            <div className="container mainMarginMinus">
                {renderPosts()}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        posts: state.postListReducer,
        users: state.userReducer,
    };
}

const mapDispatchToProps = {
    getPosts,
    getAllUserInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
