const pgp = require('pg-promise')();
const db =  pgp({
    host:process.env.HOST,
    database:process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user:process.env.USER,
});

  module.exports = db;