/* eslint-disable react-hooks/exhaustive-deps */
import PostCard from "../post/PostCard";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loggedInCheck } from "../../redux/actions/loginActions";
import { getUserPosts } from "../../redux/actions/userActions";
import { deletePost, updatePost } from "../../redux/actions/postActions";
import { popUpControl } from "../../redux/actions/popUpActions";
import { useEffect, useState } from "react";
import alertify from "alertifyjs";
import UpdatePost from "../post/UpdatePost";
import { convertNormalForm } from "../../services/time";
import LoadingSpinner from "../common/LoadingSpinner";

function Profile({
    loggedIn,
    loggedInCheck,
    getUserPosts,
    userPosts,
    popUpControl,
}) {
    let history = useHistory();
    const [updatePopUpController, setUpdatePopUpController] = useState("none");
    const [toUpdate, setToUpdate] = useState("");
    const [message, setMessage] = useState("");

    if (loggedIn.result === false) {
        history.push("/");
    }

    useEffect(() => {
        getUserPosts(loggedIn.data.id);
    }, []);

    useEffect(() => {
        getUserPosts(loggedIn.data.id);
    }, [loggedIn]);

    function popUpDisplayControllerFunc() {
        updatePopUpController === "none"
            ? setUpdatePopUpController("block")
            : setUpdatePopUpController("none");
    }

    function inputChangeHandler(event) {
        let tempValue = event.target.value;
        setMessage(tempValue);
    }

    function messagePostForm(event) {
        event.preventDefault();

        if (message === "") {
            alertify.error("Message can't be empty!");
        } else if (message.length < 3) {
            alertify.error("Message is too short!");
        } else {
            updatePost({
                postId: toUpdate.postId,
                message: message,
                userId: toUpdate.userId,
            })
                .then((response) => {
                    alertify.success(response.message);
                    getUserPosts(loggedIn.data.id);
                    setUpdatePopUpController("none");
                })
                .catch((error) => {
                    alertify.error(error);
                });
        }
    }

    function deleteHandler(post) {
        alertify.confirm(
            "Warning?",
            "Are you sure?",
            function () {
                deletePost(post.postId)
                    .then((response) => {
                        alertify.success(response.message);
                        getUserPosts(loggedIn.data.id);
                    })
                    .catch((error) => {
                        alertify.error(error);
                    });
            },
            function () {
                alertify.error("Delete process has been canceled!");
            }
        );
    }
    function updateHandler(post) {
        setUpdatePopUpController("block");
        setMessage(post.message);
        setToUpdate(post);
    }

    function colmd6(payload) {
        return (
            <div className="col-md-6">
                <PostCard
                    post={payload}
                    owner={"I AM THE OWNER BRO"}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}
                />
            </div>
        );
    }

    function getUserPostCount() {
        if (userPosts === undefined) {
            return 0;
        }

        return userPosts.length;
    }

    function renderPosts() {
        let result = [];
        if (userPosts !== undefined) {
            if (userPosts.length === 0) {
                return (
                    <div className="m-4 p-4">
                        <hr></hr>
                        <h2 className="text-center">No post yet.</h2>
                        <hr></hr>
                    </div>
                );
            }

            for (let index = 0; index < userPosts.length; index++) {
                let row;
                row = (
                    <div className="row" key={index}>
                        {userPosts[index] !== undefined
                            ? colmd6(userPosts[index])
                            : ""}
                        {userPosts[index + 1] !== undefined
                            ? colmd6(userPosts[index + 1])
                            : ""}
                    </div>
                );

                result.push(row);
                index++;
            }
        } else {
            return <LoadingSpinner />
        }

        return result;
    }

    return (
        <div>
            <div className="container mainMarginMinus">
                <div className="profileInfo">
                    <div>
                        <div className="profileInfoBox">
                            <div className="mobile-margin">
                                <div>
                                    <h2>{loggedIn.data.nickname}</h2>
                                </div>
                                <div>
                                    Account creation date :{" "}
                                    {convertNormalForm(
                                        loggedIn.data.accountCreationDate
                                    )}
                                </div>
                                <div>Post count : {getUserPostCount()}</div>
                            </div>
                            <div>
                                <img
                                    src={
                                        "./img/avatars/" +
                                        loggedIn.data.avatar +
                                        ".png"
                                    }
                                    alt="userAvatar"
                                    className="profileImg"
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>

                {renderPosts()}
                <UpdatePost
                    message={message}
                    setMessage={setMessage}
                    updatePopUpController={updatePopUpController}
                    popUpDisplayControllerFunc={popUpDisplayControllerFunc}
                    inputChangeHandler={inputChangeHandler}
                    messagePostForm={messagePostForm}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loginReducer,
        userPosts: state.userPostReducer.data,
    };
}

const mapDispatchToProps = {
    loggedInCheck,
    getUserPosts,
    popUpControl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
