import { Component, FormEvent } from "react";

export class Registration extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }
    handleInputChange = (evt) => {
        const property = evt.target.name; // This line will hold firstname when input for firstname is changed
        this.setState({ [property]: evt.target.value }); // This line will update firstname prob dynamically in this.state variable
    };
    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        // Implement: Post request with fetch to server
    };
    render() {
        console.log("state: ", this.state);
        return (
            <div>
                <h1> Welcome to your NeighborhoodNest </h1>
                {/* <LogoComponent /> */}
                <p> It takes a neighbood to raise a child</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <span>Firstname</span>
                        <input
                            name="firstname"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <span>Lastname</span>
                        {/* <input /> */}
                    </div>
                    <div>
                        <span>Email</span>
                        {/* <input /> */}
                    </div>
                    <div>
                        <span>Password</span>
                        {/* <input /> */}
                    </div>
                    <button>Register</button>
                </form>
            </div>
        );
    }
}
