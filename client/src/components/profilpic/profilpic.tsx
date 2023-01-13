// import { Component } from "react";

interface ProfilPicProps {
    imgFromApp: string;
    // userInfoApp: object;
    firstName: string;
    lastName: string;
    togglePopup: Function; // ? optinallity of props
    handleChange: Function;
}

// interface ProfilPicState {
//     togglePopup: Function;
//     handleChange: Function;
//     // userInfo: object;
//     // imgFromApp: string;
// }

export default function ProfilPic(props: ProfilPicProps) {
    return (
        <>
            <img
                src={props.imgFromApp || "/logo.png"}
                alt={`${props.firstName}, ${props.lastName}`}
                onClick={() => props.togglePopup()}
            />
        </>
    );
}

// export class ProfilPic extends Component<ProfilPicProps, ProfilPicState> {
//     render() {
//         return (
//             <div>
//                 <img
//                     onClick={this.props.togglePopup}
//                     src={this.props.imgFromApp}
//                 ></img>
//                 {/* <h1>{this.props.userInfoApp}</h1> */}
//             </div>
//         );
//     }
// }
