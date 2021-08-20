import { connect } from "react-redux";
import closeSVG from "../../img/svg/close.svg";

function UpdatePost({
    message,
    updatePopUpController,
    popUpDisplayControllerFunc,
    inputChangeHandler,
    messagePostForm,
}) {
    return (
        <div style={{ display: updatePopUpController }}>
            <div className="popUp">
                <div>
                    <div className="closeButton">
                        <img
                            src={closeSVG}
                            alt="close"
                            width="23px"
                            onClick={() => popUpDisplayControllerFunc()}
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
                                Update
                            </button>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);
