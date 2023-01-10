import { Component } from "react";
import { Logo } from "../components/logo/logo";
import Profile from "../components/profile/profile";
import { Uploader } from "../components/uploader/uploader";
import Reset from "../components/reset/reset";

// interface AppProbs {

// }

interface AppStates {
    isPopupOpen: boolean;
    username: string;
    userInfo: object;
    imgUrl: string;
}

/// Change Profile back to App; need to motify other files
export class App extends Component<{}, AppStates> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            username: "LeBron James",
            userInfo: {},
            imgUrl: null,
            // add more states
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.changeName = this.changeName.bind(this);
        // need to add bind like normal function
    }
    componentDidMount() {
        console.log("App mounted");
    }
    changeName() {
        console.log("change name");
        // this.setState({ username: newName });
    }
    togglePopup() {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }
    render() {
        return (
            <div>
                <Logo />
                <Profile
                    togglePopup={this.togglePopup}
                    changeName={this.changeName}
                    imgFromApp={""} /// Check what goes on here later
                />
                {/* {this.state.isPopupOpen && (
                    <Uploader username={this.state.username} />
                )} */}
            </div>
        );
    }
}
