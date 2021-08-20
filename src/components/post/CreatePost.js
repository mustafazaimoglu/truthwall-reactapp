import { useState } from "react";
import { connect } from "react-redux";
import closeSVG from "../../img/svg/close.svg";
import { popUpControl } from "../../redux/actions/popUpActions";
import { createPost, getPosts } from "../../redux/actions/postActions";
import { getUserPosts } from "../../redux/actions/userActions";
import alertify from "alertifyjs";

function CreatePost({
    loggedIn,
    popUp,
    popUpControl,
    createPost,
    getUserPosts,
    getPosts,
}) {
    const [message, setMessage] = useState("");

    function popUpClose() {
        popUpControl("none");
    }

    function messagePostForm(event) {
        event.preventDefault();

        if (message === "") {
            alertify.error("Message can't be empty!");
        } else if (message.length < 3) {
            alertify.error("Message is too short!");
        } else {
            const post = {
                userId: loggedIn.data.id,
                message: message,
            };

            createPost(post);
            alertify.success("Post has been created succesfully!");

            setTimeout(() => {
                popUpClose();
                getPosts();
                getUserPosts(loggedIn.data.id);
                setMessage("");
            }, 400);
        }
    }

    function inputChangeHandler(event) {
        let tempValue = event.target.value;
        setMessage(tempValue);
    }

    return (
        <div style={{ display: popUp }}>
            <div className="popUp">
                <div>
                    <div className="closeButton">
                        <img
                            src={closeSVG}
                            alt="close"
                            width="23px"
                            onClick={() => popUpClose()}
                        />
                    </div>
                    <div className="popUpBox">
                        <h3>Message :</h3>
                        <form onSubmit={messagePostForm}>
                            <textarea
                                className="form-control mt-3"
                                placeholder="Please write down your message"
                                style={{ height: "200px" }}
                                name="message"
                                id="message"
                                value={message}
                                onChange={inputChangeHandler}
                            ></textarea>
                            <button
                                className="shareButton btn btn-info"
                                type="submit"
                            >
                                Share
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        popUp: state.popUpReducer,
        loggedIn: state.loginReducer,
    };
}

const mapDispatchToProps = {
    popUpControl,
    createPost,
    getPosts,
    getUserPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
