import React from "react";
import { render } from "react-dom";
import Post from "./posts";
import "./index.css";

document.addEventListener("DOMContentLoaded", function () {
    render(<Post />, document.body.appendChild(document.createElement("div")));
});
