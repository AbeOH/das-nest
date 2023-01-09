const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

// Importing functions from db.js
const { addUser } = require("../db.js");

app.use(compression());
// Need to use the cookie-session middleware
// Need json middleware for POST requests

// Setting up cookies session
const cookieSession = require("cookie-session");

// Importing function from bcrypt.js
const { hash, compare } = require("../brypt.js");

app.use(
    cookieSession({
        secret: "It takes a village to raise a child",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
// Setting up json middleware == Enables access values in req.body
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//***************************************************************************************** */
// Get Routes
app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId }); // Instead of null; I need to use value from req.session.userId
});

//***************************************************************************************** */
// Post Routes for Registration and Login

app.post("/register", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    console.log("Body", req.body);
    hash(password).then((hashed) => {
        if (
            firstname !== "" &&
            lastname !== "" &&
            email !== "" &&
            password !== ""
        ) {
            addUser(firstname, lastname, email, hashed)
                .then((data) => {
                    // {rows}
                    console.log("rows: ", data);
                    req.session.userId = data.rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error in POST /registration: ", err);
                    res.json({ success: false });
                });
        }
    });
});

//***************************************************************************************** */
app.get("*", function (req, res) {
    console.log("Got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
