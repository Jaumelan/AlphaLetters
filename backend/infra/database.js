const  pg = require('pg');
require("dotenv").config()

const client = pg.Client({
    host:process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user:process.env.USER,
  });

  module.exports = client;