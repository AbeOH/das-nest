// import { Component } from "react";
import * as React from "react";
import { Logo } from "../components/logo/logo";
import { Profile } from "../components/profile/profile";
import { Uploader } from "../components/uploader/uploader";
import ProfilPic from "../components/profilpic/profilpic";
// import Reset from "../components/reset/reset";

interface AppStates {
    isPopupOpen: boolean;
    id: number;
    first: string;
    last: string;
    // userInfo: object;
    imgUrl?: string;
    file: File; /// Check what goes on here later
    imgApp: string;
    // add later states for bio/profile
}

/// Change Profile back to App; need to motify other files
export class App extends React.Component<{}, AppStates> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            id: null,
            first: "", // check later if can be null
            last: "",
            // username: "LeBron James",
            // userInfo: {},
            imgUrl: null,
            file: null,
            imgApp: null,

            // add more states
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        // need to add bind like normal function
    }
    componentDidMount() {
        console.log("App mounted");
        /// Fetch request to get user info
        fetch(`/user/id.json`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("dddddata from server: ", data);
                fetch(`/user/id/${data.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("Data from user: ", data);
                        if (data) {
                            const { id, first, last, imgUrl } = data;
                            this.setState({
                                id: data.id,
                                first: data.firstname,
                                last: data.lastname,
                                imgUrl: data.imgurl,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("Error in fetch: ", err);
                    });
            })
            .catch((err) => {
                console.log("EEError in fetch: ", err);
            });
    }

    // add Signout function here
    togglePopup(evt: React.MouseEvent<HTMLDivElement>) {
        /// taking evt out
        evt.preventDefault();
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }
    handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        // console.log("change name");
        this.setState({ file: evt.target.files[0] });
    }
    handleUpload(evt) {
        console.log("upload");
        evt.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                this.setState({ imgApp: data.imgUrl, isPopupOpen: false });
            })
            .catch((err) => {
                console.log("Error in fetch: ", err);
            });
    }

    render() {
        return (
            <div className="container">
                <Logo />
                <ProfilPic
                    imgFromApp={this.state.imgApp} /// Check what goes on here later
                    // userInfoApp={this.state.userInfo}
                    firstName={this.state.first}
                    lastName={this.state.last}
                    togglePopup={this.togglePopup}
                    handleChange={this.handleChange}
                />
                {this.state.isPopupOpen && (
                    <Uploader
                        // handleClose={this.handleClose} /// change
                        togglePopup={this.togglePopup}
                        handleUpload={this.handleUpload}
                        handleChange={this.handleChange}
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
