const mysql = require("mysql2");
require("dotenv").config();

const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
