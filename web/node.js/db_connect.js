let mariadb = require('mariadb');

// Connection Pool
var pool = mariadb.createPool({
  host: 'localhost',
  user: 'sms',
  password: 'pass1234',
  database: 'smsCB',
});

module.exports = Object.freeze({
  pool: pool
});

