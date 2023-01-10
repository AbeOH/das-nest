import { Component } from "react";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // need to add bind like normal function
    }
    render() {
        return (
            <div className="container">
                <h1 className="heading"> Welcome to the Nest!</h1>
                <p> It takes a neighbood to raise a child</p>
            </div>
        );
    }
}
