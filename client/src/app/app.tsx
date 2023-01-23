// import { Component } from "react";
import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Logo from "../components/logo/logo";
import Profile from "../components/profile/profile";
import { Uploader } from "../components/uploader/uploader";
import ProfilPic from "../components/profile/profilpic/profilpic";
// import { CleanPlugin } from "webpack";
import Find from "../components/find/find";
import Signout from "../components/signout/signout";
import OtherUsers from "../components/find/otherusers/otherusers";
import FriendButton from "../components/find/otherusers/friendbutton/friendbutton";
import { Friends } from "../components/friends/friends";
import Chat from "../components/chat/chat";

interface AppStates {
    isPopupOpen: boolean;
    id: number;
    first: string;
    last: string;
    imgUrl: string;
    // bio: string;
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
            // bio: "",
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
            <>
                <BrowserRouter>
                    <header className="header-app">
                        {/* <pre>{JSON.stringify(this.state)}</pre> */}
                        <Logo />
                        <Link to="/search">Find People</Link>
                        <Link to="/">My Profile</Link>
                        <Link to="/friends">Friends List</Link>
                        <Link to="/chat">Chat</Link>
                        <Link to="/signout">Sign Out</Link>
                        <ProfilPic
                            userPic={this.state.imgUrl}
                            firstName={this.state.first}
                            lastName={this.state.last}
                            togglePopup={this.togglePopup}
                        />
                    </header>

                    {this.state.isPopupOpen && (
                        <Uploader
                            togglePopup={this.togglePopup}
                            updateImageClosePopup={this.updateImageClosePopup}
                        />
                    )}

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Profile
                                    userPic={this.state.imgUrl}
                                    firstName={this.state.first}
                                    lastName={this.state.last}
                                    togglePopup={this.togglePopup}
                                />
                            }
                        />
                        <Route path="/search" element={<Find />} />
                        {/* <Route path="/users" element={<Find />} /> */}
                        <Route path="/user/:id" element={<OtherUsers />} />
                        <Route
                            path="/friends"
                            element={<Friends myId={this.state.id} />}
                        />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/signout" element={<Signout />} />
                        {/* <Route path="/friendship/:id" element={<FriendButton />} /> */}
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}
