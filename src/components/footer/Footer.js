import React, { Component } from "react";
import "./footer.css";

export default class Footer extends Component {
    render() {
        return (
            <div className="tw-main-bg">
                <div className="container">
                    <div className="footer">
                        <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                            <span className="sp-font">Truth Wall</span>
                            <span>© Copyright</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                            <span className="sp-font">Mustafa Zaimoğlu</span>
                            <span>2021</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
