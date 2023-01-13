import { Form } from "aws-sdk/clients/amplifyuibuilder";
import React, { Component } from "react";

interface UploaderProps {
    // handleClose: Function;
    togglePopup: Function;
    // handleUpload: Function;
    handleChange: Function;
    updateImageClosePopup: Function;
}

interface UploaderState {
    // handleUpload: Function;
    file: File | null;
    files: FileList | null;
}
export class Uploader extends Component<UploaderProps, UploaderState> {
    constructor(props: UploaderProps) {
        super(props);
        this.state = {
            file: null,
            files: null,
            // togglePopup: false,
            // handleUpload: false,
            // handleChange: false,
        };
        // need to add bind like normal function
    }
    componentDidMount() {
        console.log("Uploader mounted");
    }
    handleUpload(evt: React.SyntheticEvent) {
        console.log("uUUpload");
        console.log("evt: ", evt);
        evt.preventDefault();
        // const file = (evt.target as Form).children.file;
        // console.log("form: ", form);
        const formData = new FormData();
        if (this.state.file === null) {
            return;
        }
        formData.append("file", this.state.file);
        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                this.props.updateImageClosePopup(data.imgUrl);
            })
            .catch((err) => {
                console.log("Error in fetch: ", err);
            });
    }
    render() {
        return (
            <section>
                {/* <p className="container" onClick={() => this.props.togglePopup}>
                    X
                </p> */}
                <form
                    onSubmit={(evt: React.SyntheticEvent) =>
                        this.handleUpload(evt)
                    }
                    className="form"
                >
                    <h1>Change profile picture?</h1>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(evt) => this.props.handleChange(evt)}
                    />
                    <button>Upload</button>
                </form>
            </section>
        );
    }
}
