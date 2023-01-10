import React from "react";
import { Component } from "react";
// import { Link } from "react-router-dom";

interface ProfileState {
    togglePopup: () => void;
    changeName: () => void;
    imgFromApp: string;
}
export default function Profile(probs: ProfileState) {
    // console.log("Probs in profile: ", props);

    // probs.imgFromApp = probs.imgFromApp || "/default.png"; /// Check what goes on here later; probably TypeScript error

    return (
        <>
            <button onClick={probs.togglePopup}>Toggle Popup</button>
            <button onClick={() => probs.changeName()}>Change Name</button>
        </>
    );
}

// export class Profile extends Component {
//     constructor(probs) {
//         super(probs);
//         this.state = {
//             /// Need to add the prober names here
//         };
//     }
//     render() {
//         return (
//             <div className="container">
//                 <h1 className="heading"> Profile Page</h1>
//                 <p> It takes a neighbood to raise a child</p>
//                 {/* <Link to="/login">Login</Link> */}
//             </div>
//         );
//     }
// }
