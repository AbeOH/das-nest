import { createRoot } from "react-dom/client";
import { Profil } from "./app/app";
// import { Component } from "react";
import { Welcome } from "./welcome/welcome";

const root = createRoot(document.querySelector("main"));

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
