require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetwork`
);

module.exports.addUser = (firstname, lastname, email, password) => {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) returning *",
        [firstname, lastname, email, password]
    );
};

module.exports.getUser = (email) => {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
};

module.exports.addCode = (email, code) => {
    return db.query(
        "INSERT INTO reset_codes (email, code) VALUES ($1, $2) returning *",
        [email, code]
    );
};

module.exports.findCode = (email) => {
    return db.query(
        "SELECT * FROM codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'",
        [email]
    );
};
/// Need to add the time constraint of 10 m

module.exports.updatePassword = (email, password) => {
    return db.query(
        "UPDATE users SET password = $1 WHERE email = $2 RETURNING *",
        [email]
    );
};
