// import { Component } from "react";
import * as React from "react";
import { Logo } from "../components/logo/logo";
import { Profile } from "../components/profile/profile";
import { Uploader } from "../components/uploader/uploader";
import ProfilPic from "../components/profilpic/profilpic";
import { CleanPlugin } from "webpack";
// import { Reset } from "../welcome/reset/reset";

interface AppStates {
    isPopupOpen: boolean;
    id: number;
    first: string;
    last: string;
    imgUrl: string;
    // add later states for bio/profile
}
interface AppProbs {}

/// Change Profile back to App; need to motify other files
export class App extends React.Component<AppProbs, AppStates> {
    constructor(props: AppProbs) {
        super(props);
        this.state = {
            isPopupOpen: false,
            id: 0,
            first: "", // check later if can be null
            last: "",
            imgUrl: "",
            // add more states
        };
        this.togglePopup = this.togglePopup.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.updateImageClosePopup = this.updateImageClosePopup.bind(this);
        // need to add bind like normal function
    }
    componentDidMount() {
        console.log("App mounted");
        /// Fetch request to get user info
        fetch(`/user/userInformation.json`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("dddddata from server: ", data);
                if (data) {
                    console.log("Setting State");
                    const { id, first, last, imgUrl } = data;
                    console.log("Data before setting: ", data);
                    this.setState({
                        id: data.id,
                        first: data.firstname,
                        last: data.lastname,
                        imgUrl: data.imageurl,
                    });
                }
            })
            .catch((err) => {
                console.log("EEError in fetch: ", err);
            });
    }

    // add Signout function here
    togglePopup() {
        console.log("Clicking togglePopup");
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    updateImageClosePopup(newImgUrl: string) {
        console.log("newImgUrl: ", newImgUrl);
        this.setState({ imgUrl: newImgUrl });
        console.log("this.state", this.state);
        this.togglePopup();
    }
    ///

    render() {
        return (
            <div className="container">
                <pre>{JSON.stringify(this.state)}</pre>
                <Logo />
                <ProfilPic
                    userPic={this.state.imgUrl} /// Check what goes on here later
                    // userInfoApp={this.state.userInfo}
                    firstName={this.state.first}
                    lastName={this.state.last}
                    togglePopup={this.togglePopup}
                />
                {this.state.isPopupOpen && (
                    <Uploader
                        togglePopup={this.togglePopup}
                        updateImageClosePopup={this.updateImageClosePopup}
                    />
                )}
                {/* //// Sign out here */}
                {/* <div className="container">
                    <Profile
                        imgFromApp={this.state.imgApp}
                        userInfoApp={this.state.userInfo}
                        profilePic={this.state.imgUrl}
                        // togglePopup={this.togglePopup}
                    />
                </div> */}
            </div>
        );
    }
}
