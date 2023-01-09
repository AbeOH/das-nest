import { createRoot } from "react-dom/client";
import { Profil } from "./app/app";
// import { Component } from "react";
import { Welcome } from "./welcome/welcome";
// import { Logo } from "../components/logo";

const root = createRoot(document.querySelector("main"));
// root.render(<Welcome />);

/// Test Function Component: Hello World
// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

// export class App extends Component {
//     constructor(props) {
//         super(props);
//         // this.state = {};
//         // need to add bind like normal function
//     }
//     render() {
//         return (
//             <div>
//                 {/* <Logo /> */}
//                 <h1>Welcome to the Nest</h1>
//             </div>
//         );
//     }
// }

/// Fetch
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        console.log("data: ", data);
        if (data.userId) {
            root.render(<Profil />);
        } else {
            root.render(<Welcome />);
        }
    });
