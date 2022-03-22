const  {Client}= require('pg');
require("dotenv").config()

const client = new Client({
    host:process.env.HOST,
    database:process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user:process.env.USER,
  });

  module.exports = client;