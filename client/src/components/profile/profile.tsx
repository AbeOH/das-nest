import React, { Component } from "react";
// import { Component } from "react";
// import { Link } from "react-router-dom";
import ProfilPic from "../profilpic/profilpic"; // maybe create seperate component just for the image

interface ProfileProps {
    imgFromApp: string;
    userInfoApp: object;
    profilePic: string;
    // togglePopup: Function;
}
interface ProfileState {
    // togglePopup: () => void;
    // togglePopup: Function;
    //  ReturnType<typeof this.props.togglePopup>;
    // changeName: () => void;
    // handleChange: Function;
    // ReturnType<typeof this.props.handleChange>;
    // userInfo: boolean;
}
export class Profile extends React.Component<ProfileProps, ProfileState> {
    // console.log("Probs in profile: ", props);
    constructor(props: ProfileProps) {
        super(props);
        // this.state = {
        //     userInfo: false,
        //     imgApp: false,
        // };
    }
    // probs.imgFromApp = probs.imgFromApp || "/default.png"; /// Check what goes on here later; probably TypeScript error

    render() {
        return (
            <div>
                <h1>Profil Page</h1>
                {/* <ProfilPic
                    imgFromApp={this.props.imgFromApp}
                    userInfoApp={this.props.userInfoApp}
                /> */}
            </div>
        );
    }
}
