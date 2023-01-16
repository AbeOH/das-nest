import React, { Component } from "react";
// import { Component } from "react";
// import { Link } from "react-router-dom";
import ProfilPic from "./profilpic/profilpic"; // maybe create seperate component just for the image
import BioEditor from "./bioeditor/bioeditor";

interface ProfileProps {
    userPic: string;
    firstName: string;
    lastName: string;
    togglePopup: Function;
}

export default function Profile(props: ProfileProps) {
    return (
        <section>
            <div className="profilPicPro">
                <h1>Profil Page</h1>
                <ProfilPic
                    userPic={props.userPic}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    togglePopup={props.togglePopup}
                />
                <h2>
                    {props.firstName} {props.lastName}
                </h2>
                <BioEditor
                    // bio={props.bio}
                    // updateBio={props.updateBio}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    togglePopupBio={props.togglePopup}
                />
            </div>
        </section>
    );
}
