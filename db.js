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
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((data) => {
            console.log(data);
            return data.rows[0];
        });
};

module.exports.addCode = (email, code) => {
    return db
        .query(
            "INSERT INTO rest_codes (email, code) VALUES ($1, $2) returning *",
            [email, code]
        )
        .then((data) => {
            return data.rows[0];
        });
};

module.exports.findCode = (email) => {
    return db
        .query(
            "SELECT * FROM rest_codes WHERE email = $1 AND CURRENT_TIMESTAMP - create_at < INTERVAL '10 minutes'",
            [email]
        )
        .then((data) => {
            return data.rows[0];
        });
};

module.exports.updatePassword = (email, password) => {
    return db.query(
        "UPDATE users SET password = $2 WHERE email = $1 RETURNING *",
        [email, password]
    );
};

module.exports.updateProfile = (id, url) => {
    return db
        .query("UPDATE users SET imageurl=$2 WHERE id=$1 RETURNING *", [
            id,
            url,
        ])
        .then((data) => data.rows[0]);
};

module.exports.getUserId = (id) => {
    return db
        .query(
            "SELECT id, firstname, lastname, email, imageurl FROM users WHERE id=$1",
            [id]
        )
        .then((data) => data.rows[0]);
};
