// import { Component } from "react";

interface ProfilPicProps {
    userPic: string;
    firstName: string;
    lastName: string;
    togglePopup: Function;
}

export default function ProfilPic(props: ProfilPicProps) {
    return (
        <>
            <img
                src={props.userPic || "/logo.png"}
                alt={`${props.firstName}, ${props.lastName}`}
                onClick={() => props.togglePopup()}
                className="profilPic"
            />
        </>
    );
}
