import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = { step: 1 };
        this.whatToRender = this.whatToRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        switch (this.state.step) {
            case 1:
                // Make a Post request to server and check if the user exists
                this.setState({ step: 2 });
                break;
            case 2:
                this.setState({ step: 3 });
                break;

            default:
                break;
        }
    }

    whatToRender() {
        switch (this.state.step) {
            case 1:
                return <h1>Step 1</h1>;
            case 2:
                return <h1>Step 2</h1>;
            case 3:
                return <h1>Step 3</h1>;

            default:
                break;
        }
    }

    render() {
        return <div>{this.whatToRender()}</div>;
    }
}
