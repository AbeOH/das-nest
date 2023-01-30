require("dotenv").config();
const { DATABASE_URL } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(DATABASE_URL);

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

module.exports.getFriendshipStatus = (userId) => {
    return db.query(
        `SELECT f.accepted, u.id, f.sender_id, f.receiver_id, u.firstname, u.lastname, u.imageurl, u.bio from users u join friendships f on u.id = f.sender_id or u.id = f.receiver_id where u.id != $1 and (f.sender_id = $1 or f.receiver_id = $1)`,
        [userId]
    );
};

module.exports.addMessage = (sender_id, message) => {
    return db.query(
        "INSERT INTO messages (sender_id, message) VALUES ($1, $2) RETURNING *",
        [sender_id, message]
    );
};

module.exports.getMessageFromUser = (userId) => {
    return db.query(
        `SELECT m.id, m.sender_id, m.message, m.create_at, u.firstname, u.lastname, u.imageurl, u.bio from users u join messages m on u.id = m.sender_id where u.id = $1`,
        [userId]
    );
};

module.exports.getLatestMessages = (limit = 10) => {
    const sql = `
        SELECT * FROM (
            SELECT m.id, m.message, m.create_at,
                u.firstname, u.lastname, u.imageurl
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            ORDER BY m.create_at DESC
            limit $1
        ) as results ORDER BY create_at ASC
    `;

    return db.query(sql, [limit]);
};

module.exports.createGroup = (data) => {
    console.log("data in DB createGroup", data);
    const { group_name, group_description, group_imageurl } = data;
    return db
        .query(
            "INSERT INTO groups (name, description, imageurl) VALUES ($1, $2, $3) RETURNING *",
            [group_name, group_description, group_imageurl]
        )
        .then((data) => data.rows);
};

module.exports.updateImageGroups = (id, url) => {
    return db.query(
        "UPDATE groups SET imageurl = $2 WHERE id = $1 RETURNING *",
        [id, url]
    );
    // .then((data) => data.rows[0]);
};

module.exports.postInsert = (eventName, startEventDate, endEventDate) => {
    // const { userId, post, startEventDate, endEventDate } = data;
    return db
        .query(
            "INSERT INTO posts (content, start_event_date, end_event_date) VALUES ($1, $2, $3) RETURNING *",
            [eventName, startEventDate, endEventDate]
        )
        .then((data) => data.rows[0]);
};

module.exports.getPosts = () => {
    return db.query("SELECT * FROM posts").then((data) => data.rows);
};

module.exports.getGroups = () => {
    return db.query("SELECT * FROM groups").then((data) => data.rows);
};

module.exports.getGroupById = (id) => {
    return db
        .query("SELECT * FROM groups WHERE id=$1", [id])
        .then((data) => data.rows[0]);
};
