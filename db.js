require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetwork`
);

// const db = spicedPg(
//     process.env.DATABASE_URL ||
//         `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetowrk`
// );

module.exports.addUser = (firstname, lastname, email, password) => {
    console.log("firstname: ", firstname, lastname, email, password);
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) returning *",
        [firstname, lastname, email, password]
    );
    // .then((results) => {
    //     return results;
    // });
};
