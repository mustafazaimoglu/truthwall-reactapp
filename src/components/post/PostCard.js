import { connect } from "react-redux";
import { convertNormalForm } from "../../services/time";
import likeIcon from "../../img/svg/like.svg";
import dislikeIcon from "../../img/svg/dislike.svg";

function PostCard({ post, owner, deleteHandler, updateHandler }) {
    const newStyle =
        owner === undefined ? "like-dislike-count-holder" : "like-dislike-count-holder extra-margin-bottom";

    const styyyle = post.userInteraction;
    console.log(styyyle);

// Give some love to buttons

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
                    <div className="action-center-item">
                        <img
                            src={likeIcon}
                            alt="like-svg"
                            className="like-dislike-icon"
                        ></img>
                        Like
                    </div>
                    <div className="action-center-item">
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
    return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
