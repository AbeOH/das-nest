const cookieSession = require("cookie-session");
const { SESSION_SECRET } = process.env;

module.exports.cookieSession = cookieSession({
    secret: SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
    sameSite: true,
});

module.exports.verifyFields = (req, res, next) => {
    console.log("req.body in verifyFields: ", req.body);
    const { group_name, group_description } = req.body;

    // Verify that the required fields are filled out
    next();
};
