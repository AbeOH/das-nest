import { Component } from "react";
import { Link } from "react-router-dom";

interface ResetProps {}

interface ResetState {
    step: number;
    email: string;
    code: string;
    password: string;
    error: string;
}

export default class Reset extends Component<{}, ResetState> {
    constructor(probs: ResetProps) {
        super(probs);
        this.state = { step: 1, email: "", code: "", password: "", error: "" };
        this.whatToRender = this.whatToRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.state, [evt.target.name]: evt.target.value });
    }

    handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        switch (this.state.step) {
            case 1:
                // Make a Post request to server and check if the user exists
                fetch("/reset/start", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: this.state.email,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            this.setState({ step: 2 });
                        } else {
                            this.setState({ error: data.error });
                        }
                    })
                    .catch((err) => {
                        console.log("err in POST /reset/start: ", err);
                    });
                break;
            case 2:
                // Make a Post request to server and check if the code is correct
                fetch("/reset/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        code: this.state.code,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("dddata: ", data);
                        if (data.success) {
                            this.setState({ step: 3 });
                        } else {
                            this.setState({ error: data.error });
                        }
                    })
                    .catch((err) => {
                        console.log("err in POST /reset/verify: ", err);
                    });
                break;
            default:
                break;
        }
    }

    whatToRender() {
        switch (this.state.step) {
            case 1:
                return (
                    <div>
                        <h1>Reset password</h1>
                        <h2>Enter Email: </h2>
                        <form onSubmit={this.handleSubmit}>
                            <input name="email" onChange={this.handleChange} />
                            <button>Next</button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h1>Reset password</h1>
                        <form onSubmit={this.handleSubmit}>
                            <h2>Enter code: </h2>
                            <input name="code" onChange={this.handleChange} />
                            <h2>Enter new password: </h2>
                            <input
                                name="password"
                                onChange={this.handleChange}
                            />
                            <button>Next</button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h1>Yeeeah Congratulations</h1>
                        <h2> You have successfully reset your password</h2>
                        <Link to="/login">Click here to login</Link>
                    </div>
                );

            default:
                break;
        }
    }

    render() {
        return <div>{this.whatToRender()}</div>;
    }
}
