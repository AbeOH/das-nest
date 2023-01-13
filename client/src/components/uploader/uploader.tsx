import { Form } from "aws-sdk/clients/amplifyuibuilder";
import React, { Component } from "react";

interface UploaderProps {
    togglePopup: Function;
    // handleChange: Function;
    updateImageClosePopup: Function;
    // fileFromApp: File | null;
}

interface UploaderState {
    fileUrl: File | null;
    // files: FileList | null;
}
export class Uploader extends Component<UploaderProps, UploaderState> {
    constructor(props: UploaderProps) {
        super(props);
        this.state = {
            fileUrl: null,
            // files: null,
        };
        // need to add bind like normal function
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Uploader mounted");
    }
    handleUpload(evt: React.SyntheticEvent) {
        console.log("uUUpload");
        console.log("evt: ", evt);
        evt.preventDefault();
        // const file = (evt.target as Form)//   .children.file;
        // console.log("form: ", form);
        const formData = new FormData();
        if (this.state.fileUrl === null) {
            return;
        }
        console.log("Does it append?");
        formData.append("file", this.state.fileUrl);
        console.log("formData: ", formData);
        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                this.props.updateImageClosePopup(data.imageurl);
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    }
    handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        console.log("change name", evt.target.files);
        if (evt.target.files) {
            console.log("evt.target.files: ", evt.target.files[0]);
            const fileUrl = evt.target.files[0];
            // const file = evt.target.files[0]
            // if (file !== null) {
            this.setState({ fileUrl });
            // return;
            // }
        }
    }
    render() {
        console.log("Fille", this.state.fileUrl);
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
                        onChange={(evt) => this.handleChange(evt)}
                    />
                    <button>Upload</button>
                </form>
            </section>
        );
    }
}
