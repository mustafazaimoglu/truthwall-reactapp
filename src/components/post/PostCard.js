/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { useRef, useState } from "react";
import { convertNormalForm } from "../../services/time";
import likeIcon from "../../img/svg/like.svg";
import dislikeIcon from "../../img/svg/dislike.svg";
import alertify from "alertifyjs";
import {
    dislikePost,
    likePost,
    undislikeAndLikePost,
    undislikePost,
    unlikeAndDislikePost,
    unlikePost,
} from "../../services/likeDislikeService";

function PostCard({ post, owner, deleteHandler, updateHandler, loggedIn }) {
    const likeButtonDiv = useRef();
    const dislikeButtonDiv = useRef();
    const [likeCountState, setLikeCountState] = useState(post.likeCount);
    const [dislikeCountState, setDislikeCountState] = useState(
        post.dislikeCount
    );

    const newStyle =
        owner === undefined
            ? "like-dislike-count-holder"
            : "like-dislike-count-holder extra-margin-bottom";
    const actionCenterItem = "action-center-item";
    const actionCenterItemLiked =
        actionCenterItem + " action-center-item-liked";
    const actionCenterItemDisliked =
        actionCenterItem + " action-center-item-disliked";

    const likeButtonStyle =
        post.userInteraction === 1 ? actionCenterItemLiked : actionCenterItem;
    const dislikeButtonStyle =
        post.userInteraction === -1
            ? actionCenterItemDisliked
            : actionCenterItem;

    function likeButtonClickHandler() {
        if (loggedIn.result === false) {
            alertify.warning("Please log in first!");
            return;
        }

        if (post.userInteraction === 1) {
            likeButtonDiv.current.className = actionCenterItem;
            setLikeCountState((likeCountState) => likeCountState - 1);
            post.userInteraction = 0;

            unlikePost(post.postId, loggedIn.data.id)
                .then((res) => {
                    alertify.notify("Post unlike success!");
                })
                .catch((err) => {
                    alertify.error(err);
                });
        } else if (post.userInteraction === -1) {
            dislikeButtonDiv.current.className = actionCenterItem;
            setDislikeCountState((dislikeCountState) => dislikeCountState - 1);
            likeButtonDiv.current.className = actionCenterItemLiked;
            setLikeCountState((likeCountState) => likeCountState + 1);
            post.userInteraction = 1;

            undislikeAndLikePost(post.postId, loggedIn.data.id)
                .then((res) => {
                    alertify.success("Post undislike and like success!");
                })
                .catch((err) => {
                    alertify.error(err);
                });
        } else {
            likeButtonDiv.current.className = actionCenterItemLiked;
            setLikeCountState((likeCountState) => likeCountState + 1);
            post.userInteraction = 1;

            likePost(post.postId, loggedIn.data.id)
                .then((res) => {
                    alertify.success("Post like success!");
                })
                .catch((err) => {
                    alertify.error(err);
                });
        }
    }

    function dislikeButtonClickHandler() {
        if (loggedIn.result === false) {
            alertify.warning("Please log in first!");
            return;
        }

        if (post.userInteraction === 1) {
            likeButtonDiv.current.className = actionCenterItem;
            setLikeCountState((likeCountState) => likeCountState - 1);
            dislikeButtonDiv.current.className = actionCenterItemDisliked;
            setDislikeCountState((dislikeCountState) => dislikeCountState + 1);
            post.userInteraction = -1;

            unlikeAndDislikePost(post.postId, loggedIn.data.id)
                .then((res) => {
                    alertify.success("Post unlike and dislike success!");
                })
                .catch((err) => {
                    alertify.error(err);
                });
        } else if (post.userInteraction === -1) {
            dislikeButtonDiv.current.className = actionCenterItem;
            setDislikeCountState((dislikeCountState) => dislikeCountState - 1);
            post.userInteraction = 0;

            undislikePost(post.postId, loggedIn.data.id)
                .then((res) => {
                    alertify.notify("Post undislike success!");
                })
                .catch((err) => {
                    alertify.error(err);
                });
        } else {
            dislikeButtonDiv.current.className = actionCenterItemDisliked;
            setDislikeCountState((dislikeCountState) => dislikeCountState + 1);
            post.userInteraction = -1;

            dislikePost(post.postId, loggedIn.data.id)
                .then((res) => {
                    alertify.success("Post dislike success!");
                })
                .catch((err) => {
                    alertify.error(err);
                });
        }
    }

    return (
        <div className="postCard-parent">
            <div className="postCard">
                <div className="tw-dashed">
                    <div>
                        <div className="postInfo">
                            <div id="postLink" className="text-decoration-none">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img
                                            src={
                                                "./img/avatars/" +
                                                post.avatar +
                                                ".png"
                                            }
                                            alt="userLogo"
                                            className="postImg"
                                        />
                                    </div>
                                    <div className="mx-2">{post.username}</div>
                                </div>
                            </div>
                            <div>{convertNormalForm(post.postDate)}</div>
                        </div>
                        <div className="tw-divider"></div>
                    </div>
                    <div className="tw-post-message">
                        {'"' + post.message + '"'}
                    </div>
                    <div className={newStyle}>
                        <div className="like-dislike-count-holder-item">
                            <span>{likeCountState}</span> Like
                        </div>
                        <div className="like-dislike-count-holder-item">
                            <span>{dislikeCountState}</span> Dislike
                        </div>
                    </div>
                    {owner === undefined ? (
                        ""
                    ) : (
                        <div className="tw-position">
                            <button
                                className="btn btn-success me-1"
                                onClick={() => updateHandler(post)}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-danger ms-1"
                                onClick={() => deleteHandler(post)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="action-center">
                    <div
                        className={likeButtonStyle}
                        ref={likeButtonDiv}
                        onClick={likeButtonClickHandler}
                    >
                        <img
                            src={likeIcon}
                            alt="like-svg"
                            className="like-dislike-icon"
                        ></img>
                        Like
                    </div>
                    <div
                        className={dislikeButtonStyle}
                        ref={dislikeButtonDiv}
                        onClick={dislikeButtonClickHandler}
                    >
                        <img
                            src={dislikeIcon}
                            alt="dislike-svg"
                            className="like-dislike-icon"
                        ></img>
                        Dislike
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { loggedIn: state.loginReducer };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
