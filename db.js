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
    return db.query(
        "UPDATE users SET imageurl = $2 WHERE id = $1 RETURNING *",
        [id, url]
    );
    // .then((data) => data.rows[0]);
};

module.exports.getUserId = (id) => {
    return db
        .query(
            "SELECT id, firstname, lastname, email, imageurl, bio FROM users WHERE id=$1",
            [id]
        )
        .then((data) => data.rows[0]);
};

module.exports.getUserBio = (id) => {
    return db
        .query("SELECT bio FROM users WHERE id=$1", [id])
        .then((data) => data.rows[0]);
};

module.exports.updateBio = (id, bio) => {
    return db
        .query("UPDATE users SET bio = $2 WHERE id = $1 RETURNING *", [id, bio])
        .then((data) => data.rows[0]);
};

module.exports.getMatchingSearch = (val) => {
    return db.query("SELECT * FROM users WHERE firstname ILIKE $1", [
        val + "%",
    ]);
};

module.exports.findFriendship = (user1, user2) => {
    return db.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)",
        [user1, user2]
    );
};

module.exports.addFriendship = (user1, user2) => {
    console.log("user1", user1);
    console.log("user2", user2);
    return db.query(
        "INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *",
        [user1, user2]
    );
};

module.exports.acceptFriendship = (user1, user2) => {
    console.log("user1", user1);
    console.log("user2", user2);
    return db.query(
        "UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) RETURNING *",
        [user1, user2]
    );
};

module.exports.cancelFriendship = (user1, user2) => {
    return db.query(
        "DELETE FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)",
        [user1, user2]
    );
};

/// Check accept and recect db queries again
