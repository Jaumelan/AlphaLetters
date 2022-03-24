require("dotenv").config()
const host = "localhost"
const database = "alphazendinha"
const password = "Io.ri5"
const port = 5432
const user = "postgres"
const pgp = require('pg-promise')();
const db =  pgp({
    host:process.env.HOST || host ,
    database:process.env.DATABASE || database,
    password: process.env.PASSWORD || password,
    port: process.env.PORT || port,
    user:process.env.USER || user,
});

  module.exports = db;