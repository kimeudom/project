// Handles all post and get operations

const db= require('./db_connect');

db.getConnection().then(function(conn) {
  conn.query('SELECT * FROM clients').then(function(rows) {
    console.log(rows);
    conn.release();
  }).catch(function(err) {
    console.log(err);
    conn.release();
  });
}).catch(function(err) {
  console.log(err);
});

