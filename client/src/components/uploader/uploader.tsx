import React, { Component } from "react";

export class Uploader extends Component {
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
            <div>Hi !!! </div>
            // <div className="container">
            //     <h1 className="heading"> Welcome to the Nest!</h1>
            //     <p> It takes a neighbood to raise a child</p>
            //     <form onSubmit={this.props.handleSubmit}>
            //         <h2>Change profile picture?</h2>
            //         <input
            //             type="file"
            //             name="file"
            //             onChange={this.props.handleChange}
            //         />
            //         <button>Upload</button>
            //     </form>
            // </div>
        );
    }
}
