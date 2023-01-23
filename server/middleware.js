const cookieSession = require("cookie-session");
const { SESSION_SECRET } = process.env;

module.exports.cookieSession = cookieSession({
    secret: SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
    sameSite: true,
});
