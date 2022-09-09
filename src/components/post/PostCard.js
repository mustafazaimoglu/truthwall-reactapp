/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { useRef } from "react";
import { convertNormalForm } from "../../services/time";
import likeIcon from "../../img/svg/like.svg";
import dislikeIcon from "../../img/svg/dislike.svg";
import alertify from "alertifyjs";

function PostCard({ post, owner, deleteHandler, updateHandler, loggedIn }) {
    const likeButtonDiv = useRef();
    const dislikeButtonDiv = useRef();

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
            post.userInteraction = 0;
        } else if (post.userInteraction === -1) {
            dislikeButtonDiv.current.className = actionCenterItem;
            likeButtonDiv.current.className = actionCenterItemLiked;
            post.userInteraction = 1;
        } else {
            likeButtonDiv.current.className = actionCenterItemLiked;
            post.userInteraction = 1;
        }
    }

    function dislikeButtonClickHandler() {
        if (loggedIn.result === false) {
            alertify.warning("Please log in first!");
            return;
        }

        if (post.userInteraction === 1) {
            likeButtonDiv.current.className = actionCenterItem;
            dislikeButtonDiv.current.className = actionCenterItemDisliked;
            post.userInteraction = -1;
        } else if (post.userInteraction === -1) {
            dislikeButtonDiv.current.className = actionCenterItem;
            post.userInteraction = 0;
        } else {
            dislikeButtonDiv.current.className = actionCenterItemDisliked;
            post.userInteraction = -1;
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
                            {post.likeCount} Like
                        </div>
                        <div className="like-dislike-count-holder-item">
                            {post.dislikeCount} Dislike
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
    return {loggedIn: state.loginReducer};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
