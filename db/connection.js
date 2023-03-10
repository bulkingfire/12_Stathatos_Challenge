const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",

    user: "root",

    password: "utexas11",

    database: "tr_db",
  },
  console.log(`Connected to the tr_db database.`)
);

module.exports = connection;
