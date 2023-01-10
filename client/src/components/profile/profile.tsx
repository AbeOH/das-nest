import { Component } from "react";
// import { Link } from "react-router-dom";

export class Profile extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            /// Need to add the prober names here
        };
    }
    render() {
        return (
            <div className="container">
                <h1 className="heading"> Profile Page</h1>
                <p> It takes a neighbood to raise a child</p>
                {/* <Link to="/login">Login</Link> */}
            </div>
        );
    }
}
