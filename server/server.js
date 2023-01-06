const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

app.use(compression());
// Need to use the cookie-session middleware
// Need json middleware for POST requests

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", (req, res) => {
    res.json({ userId: null }); // Instead of null; I need to use value from req.session.userId
});

app.get("*", function (req, res) {
    console.log("Got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
