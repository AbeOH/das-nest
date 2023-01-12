import { createRoot } from "react-dom/client";
import { App } from "./app/app";
// import { Component } from "react";
import { Welcome } from "./welcome/welcome";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.querySelector("main") as HTMLElement);

/// Fetch
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        console.log("data: ", data);
        if (data.userId) {
            root.render(<App />);
        } else {
            root.render(<Welcome />);
        }
    });
