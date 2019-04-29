const mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'id3'
});

module.exports = db;