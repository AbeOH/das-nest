require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

// Importing functions from db.js
const {
    rejectFriendship,
    acceptFriendship,
    findFriendship,
    getMatchingSearch,
    getUserBio,
    updateBio,
    getUserId,
    updateProfile,
    addUser,
    getUser,
    addCode,
    findCode,
    updatePassword,
} = require("../db.js");

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

// AWS access
const aws = require("aws-sdk");
const { AWS_KEY, AWS_SECRET, AWS_Region } = process.env;
const { SECRET } = process.env;

const ses = new aws.SES({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_Region,
});

const { uploader, fileUpload } = require("./uploader.js");

app.use(
    cookieSession({
        secret: "It takes a village to raise a child",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
// Setting up json middleware == Enables access values in req.body
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("req.body:", req.body);
    console.log("---------------------");
    next();
});

//***************************************************************************************** */
// Get Routes
app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId }); // Instead of null; I need to use value from req.session.userId
});

app.get("/user/userInformation.json", (req, res) => {
    // const { userId } = req.session;
    console.log("Hello Test");
    const userId = req.session.userId;
    console.log("userId: ", userId);
    getUserId(userId)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log("error in GET /user/userInformation.json: ", err);
            res.json("Error", err);
        });
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    console.log("Req", req.params);
    getUserId(id)
        .then((data) => {
            console.log("Alllll Data: ", data);
            res.json(data);
        })
        .catch((err) => {
            console.log("error in GET /user/:id.json: ", err);
            res.json("Error", err);
        });
});

app.get("/bio", (req, res) => {
    const userId = req.session.userId;
    getUserBio(userId).then((data) => {
        res.json(data);
    });
});

app.get("/users", (req, res) => {
    // const { id } = req.params;
    const val = req.query.search;
    console.log("req search: ", val);
    getMatchingSearch(val)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log("error in GET /users/:id.json: ", err);
            res.json("Error", err);
        });
});

app.get("/friendshipStatus/:senderId", (req, res) => {
    console.log("friendshipStatus");
    /// Can I get the senderId from the cookies session?
    const myProfilRequestId = req.session.userId;
    const otherRequestId = req.params.senderId;
    findFriendship(myProfilRequestId, otherRequestId)
        .then((data) => {
            if (data.accepted === true) {
                res.json({ friendStatus: "UNFRIEND", accepted: true });
            } else if (
                data.accepted === false &&
                data.sender_id === otherRequestId
            ) {
                res.json({ friendStatus: "CANCEL", accepted: false });
            } else if (
                data.accepted === false &&
                data.sender_id === myProfilRequestId
            ) {
                res.json({ friendStatus: "ACCEPT", accepted: false });
            } else {
                res.json({ friendStatus: "ADD FRIEND", accepted: false });
            }
        })
        .catch((err) => {
            console.log(
                "error in GET /frinedship/:senderId/:receiverId: ",
                err
            );
            res.json("Error", err);
        });
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
            compare(password, user.password).then((isMatch) => {
                console.log("Check: ", isMatch);
                if (isMatch) {
                    req.session.userId = user.id;
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
//*****************************************************************************************
// Post Routes for Password Reset
app.post("/reset/start", (req, res) => {
    const { email } = req.body;
    getUser(email).then((user) => {
        if (user) {
            console.log("data: ", user);
            const code = cryptoRandomString({ length: 6 });
            console.log("code: ", code);
            console.log("email: ", email);
            addCode(email, code).then((data) => {
                res.json({ success: true });
                console.log("data", data); /// Log code instead of email to check if verficiation works
                //     if (data) {
                //         ses.sendEmail({
                //             Source: "adaptable.monarch@spicedling.email",
                //             Destination: {
                //                 ToAddresses: ["adaptable.monarch@spicedling.email"],
                //             },
                //             Message: {
                //                 Body: {
                //                     Text: {
                //                         Data: `Your code is ${code}`,
                //                     },
                //                 },
                //                 Subject: {
                //                     Data: "Reset your password",
                //                 },
                //             },
                //         })
                //             .promise()
                //             .then(() => {
                //                 res.json({ success: true });
                //                 console.log("Email sent");
                //             })
                //             .catch((err) => {
                //                 console.log("Error in sending email: ", err);
                //                 res.json({ success: false });
                //             });
                //     }
            });
        } else {
            res.json({ success: false });
        }
    });
});

app.post("/reset/verify", (req, res) => {
    const { email, code, password } = req.body;
    findCode(email).then((data) => {
        console.log("DData: ", data);
        if (data.code === code) {
            // check again
            hash(password)
                .then((hashed) => updatePassword(email, hashed))
                .then((data) => {
                    console.log("DdData: ", data);
                    if (data) {
                        console.log("Password updated");
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) =>
                    console.log("Error in updating password: ", err)
                );
            // res.json({ success: false });
        } else {
            res.json({ success: false });
        }
    });
});
//*****************************************************************************************
/// Post Upload Routes, Update bio, Logout

app.post("/upload", uploader.single("file"), fileUpload, (req, res) => {
    console.log("Files", req.file);
    if (req.file) {
        const url = res.locals.fileUrl;
        const iD = req.session.userId;
        console.log("url: ", url);
        updateProfile(iD, url)
            .then((data) => {
                console.log("What is data", data);
                res.json(data.rows[0]);
            })
            .catch((err) => console.log("Error in updating profile: ", err));
    }
});

app.post("/bio", (req, res) => {
    const { bio } = req.body;
    const iD = req.session.userId;
    console.log("Bio: ", bio);
    updateBio(iD, bio).then((data) => res.json(data));
});

app.post("/signout", (req, res) => {
    req.session = null;
    res.json({ userId: null });
});

//*****************************************************************************************
// Post Routes for Friendship accepetane and cancellation

app.post("/friendStatusUpdate", (req, res) => {
    /// Add Friend, delete friendship
    const myProfilRequestId = req.session.userId;
    const otherRequestId = req.params.senderId;
    acceptFriendship(myProfilRequestId, otherRequestId)
        .then((data) => {
            console.log("Friend Accepted: ", data);
            res.json({ friendStatus: "ACCEPT" });
        })
        .catch((err) => console.log("Error in accepting friendship: ", err));
});

// app.post("/friendreject/:senderId/:userId", (req, res) => {
//     rejectFriendship(req.params.senderId, req.params.userId)
//         .then((data) => {
//             console.log("Friend Rejected: ", data);
//             res.json(data);
//         })
//         .catch((err) => console.log("Error in rejecting friendship: ", err));
// });

//***************************************************************************************** */
app.get("*", function (req, res) {
    // console.log("Got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
