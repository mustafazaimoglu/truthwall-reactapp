import React, { Component } from "react";

export default class NotFound extends Component {
    render() {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1>NOT FOUND</h1>
                <hr />
                <h3>Wrong number, pal!</h3>
            </div>
        );
    }
}
