require("dotenv").config()
const pgp = require('pg-promise')();

// const host = "localhost"
// const database = "alphazendinha"
// const password = "Io.ri5"
// const port = 5432
// const user = "postgres"

const db =  pgp({
    host:process.env.HOST  ,
    database:process.env.DATABASE,
    password: process.env.PASSWORD ,
    port: process.env.PORT,
    user:process.env.USER,
});

module.exports = db;