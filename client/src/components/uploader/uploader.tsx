import React, { Component } from "react";

export class Uploader extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            upload: false,
        };
        // need to add bind like normal function
    }
    componentDidMount() {
        console.log("Uploader mounted");
    }
    render() {
        return (
            <div>
                <div className="container" onClick={this.props.toggle}></div>
                <form onSubmit={this.props.upload} className="form">
                    <h1>Change profile picture?</h1>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={this.props.handleChange}
                    />
                    <button>Upload</button>
                </form>
            </div>
        );
    }
}
