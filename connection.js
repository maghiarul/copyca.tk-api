var mysql = require("mysql");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "copyca.tk",
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
  connection.release();
});

module.exports = pool;
