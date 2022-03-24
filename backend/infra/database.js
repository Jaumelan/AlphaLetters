const pgp = require('pg-promise')();
// const host = "localhost"
// const database = "alphazendinha"
// const password = "Io.ri5"
// const port = 5432
// const user = "postgres"

const db =  pgp({
    host:'localhost' || process.env.HOST  ,
    database:'alphazendinha' || process.env.DATABASE,
    password:'Io.ri5' || process.env.PASSWORD ,
    port: 5432  || process.env.PORT,
    user:'postgres' || process.env.USER,
});

module.exports = db;