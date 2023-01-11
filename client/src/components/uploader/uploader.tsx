import React, { Component } from "react";

interface UploaderProps {
    // handleClose: Function;
    togglePopup: Function;
    handleUpload: Function;
    handleChange: Function;
}

export class Uploader extends Component<UploaderProps, {}> {
    constructor(props) {
        super(props);
        // this.state = {
        //     togglePopup: false,
        //     handleUpload: false,
        //     handleChange: false,
        // };
        // need to add bind like normal function
    }
    componentDidMount() {
        console.log("Uploader mounted");
    }
    render() {
        return (
            <div>
                <div
                    className="container"
                    onClick={() => this.props.togglePopup}
                ></div>
                <form onSubmit={() => this.props.handleUpload} className="form">
                    <h1>Change profile picture?</h1>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={() => this.props.handleChange}
                    />
                    <button>Upload</button>
                </form>
            </div>
        );
    }
}
