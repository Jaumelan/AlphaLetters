const pgp = require('pg-promise')();
require('dotenv').config()
const db =  pgp({
    host:'localhost',
    database:'alphazendinha',
    password:'Io.ri5',
    port: 5432,
    user:'postgres',
});

module.exports = db;