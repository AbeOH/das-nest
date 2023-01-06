/// What packages do I need to install?

module.exports.addUser = (firstname, lastname, email, password) => {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, email, password]
    );
};
