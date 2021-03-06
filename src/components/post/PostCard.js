import { connect } from "react-redux";

function PostCard({ post, user, owner, deleteHandler, updateHandler }) {
    const messageStyle =
        owner === undefined ? "tw-post-message" : "tw-post-message2";

    return (
        <div style={{ width: "100%" }}>
            {user === undefined ? (
                " "
            ) : (
                <div className="postCard">
                    <div className="tw-dashed">
                        <div className="postInfo">
                            <div id="postLink" className="text-decoration-none">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img
                                            src={
                                                "./img/avatars/" +
                                                user.avatar +
                                                ".png"
                                            }
                                            alt="userLogo"
                                            className="postImg"
                                        />
                                    </div>
                                    <div className="mx-2">{user.nickname}</div>
                                </div>
                            </div>
                            <div>{post.postDate}</div>
                        </div>
                        <div className="tw-divider"></div>
                        <div className={messageStyle}>
                            {'"' + post.message + '"'}
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
                </div>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
