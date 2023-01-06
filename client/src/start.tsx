import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import { Welcome } from "./welcome/welcome";

const root = createRoot(document.querySelector("main"));
root.render(<HelloWorld />);

/// Test Function Component: Hello World
function HelloWorld() {
    return <div>Hello, World!</div>;
}

/// Fetch
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        if (data.userId) {
            root.render(<App />);
        } else {
            root.render(<Welcome />);
        }
    });
