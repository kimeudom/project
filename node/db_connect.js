let mariadb = require('mariadb');

// Connection Pool
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'sms',
  password: 'pass1234',
  database: 'smsCB',
  permitLocalInfile: true
});

// Creating and exporting a connection object

module.exports = {
  getConnection: function () {
    return pool.getConnection().then(function (conn) {
      return conn;
    }).catch(function (err) {
      throw err;
    });
  }
};