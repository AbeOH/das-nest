const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

// Importing functions from db.js
const { addUser, getUser } = require("../db.js");

app.use(compression());
// Need to use the cookie-session middleware
// Need json middleware for POST requests

// Setting up cookies session
const cookieSession = require("cookie-session");

// Importing function from bcrypt.js
const { hash, compare } = require("../brypt.js");

// Random key generator
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({ length: 6 });

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
// Post Routes for Registration
app.post("/register", (req, res) => {
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    // const email = req.body.email;
    // const password = req.body.password;
    console.log("Body", req.body);
    const { firstname, lastname, email, password } = req.body;
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

// Post Routes for Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    getUser(email).then((user) => {
        if (user) {
            console.log("data: ", user);
            compare(password, user.rows[0].password).then((isMatch) => {
                console.log("Check: ", isMatch);
                if (isMatch) {
                    req.session.userId = user.rows[0].id;
                    console.log("Logged In", req.session.userId);
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            });
        } else {
            res.json({ success: false });
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
