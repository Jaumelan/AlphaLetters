const pgp = require('pg-promise')();
require('dotenv').config()
const db =  pgp({
    host:process.env.HOST || 'localhost'  ,
    database:  process.env.DATABASE || 'alphazendinha',
    password:process.env.PASSWORD || 'Io.ri5'  ,
    port: process.env.PORT || 5432,
    user: process.env.USER ||'postgres',
});

module.exports = db;