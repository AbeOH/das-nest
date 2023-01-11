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
        <div>
            <p>HELLO</p>
            <img
                src={props.imgFromApp}
                alt={`${props.firstName}, ${props.lastName}`}
            />
            <h1 className="user">
                <p>WORLD</p>
                <p>
                    {props.firstName} {props.lastName}
                </p>
            </h1>
        </div>
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
