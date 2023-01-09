import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Logo } from "../components/logo";

import { Registration } from "./registration/registration";
// import { Login } from "./login/login";
export function Welcome() {
    return (
        <div>
            <h1> Welcome to the Nest !</h1>
            {/* <Logo /> */}
            <p> It takes a neighbood to raise a child</p>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Registration />}></Route>
                    {/* <Route path="/logo" element={<Logo />}></Route> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

/// Round brackets needed? In notes without, but in code with round bracket.
