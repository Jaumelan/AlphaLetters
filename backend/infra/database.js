const pgp = require('pg-promise')();
require('dotenv').config()
console.log(process.env.USERNAME)
const db =  pgp({
    host:process.env.HOST || 'localhost',
    user: process.env.USER ||'postgres',
    database:  process.env.DATABASE || 'alphazendinha',
    password:process.env.PASSWORD || 'Io.ri5'  ,
    port: process.env.PORT || 5432,
});

module.exports = db;