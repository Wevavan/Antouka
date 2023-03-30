const bcrypt = require('bcrypt');

const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("1234",10),
        isAdmin: true,
    },
    {
        name: "User",
        email: "user@example.com",
        password: bcrypt.hashSync("1234",10),
    }
]

module.exports = users;