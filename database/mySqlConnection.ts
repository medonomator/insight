var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydb"
});

export const mySqlconnection = async () => {

  con.connect(function (err) {
    if (err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
      if (err) throw err;
      console.log("Database Connected");

      var sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255),name VARCHAR(255), address VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created", result);
      });
    });
  });

}
