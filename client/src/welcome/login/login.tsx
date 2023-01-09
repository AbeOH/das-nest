import { Component, FormEvent } from "react";
import { redirect } from "react-router";

interface LoginState {
    email?: string;
    password?: string;
    errormsg?: string;
}

export class Login extends Component<any, LoginState> {
    constructor(probs) {
        super(probs);
        this.state = {
            email: "",
            password: "",
            errormsg: "",
        };
    }
    handleInputChange = (evt) => {
        const property = evt.target.name; // This line will hold value when input for value is changed
        const value = evt.target.value;
        console.log("Evt Target", evt.target);
        this.setState({ [property]: value }); // This line will update value prob dynamically in this.state variable
    };
    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        const { email, password } = this.state;
        console.log("Submit", this.state);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("data: ", data);
                if (data.success) {
                    location.reload();
                } else {
                    this.setState({
                        errormsg:
                            "Something went wrong. Please try again later or with a different email",
                    });
                }
            })
            .catch(() => {
                this.setState({
                    errormsg: "Something went wrong. Please try again later",
                });
            });
    };
    render() {
        console.log("state: ", this.state);
        return (
            <div className="container">
                <h1> Welcome to your NeighborhoodNest </h1>
                {/* <LogoComponent /> */}
                <p> It takes a neighbood to raise a child</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <span>Email</span>
                        <input
                            required
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            required
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button>Log In</button>
                </form>
                <p>
                    If you have forget your passport,
                    <a href="/reset"> reset here </a>
                </p>
            </div>
        );
    }
}
