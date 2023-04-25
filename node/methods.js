// Handles all post and get operations
const db= require('./db_connect');

// Insert value in the clients table
const addCarrier = (id, name) => db.getConnection().then(function (conn) {
  statement = `INSERT INTO carriers(id, carrierName) VALUES("${id}","${name}")`;
  conn.query(statement, function (err, result) {
    if (err) throw err;
    console.log(`${result.affectedRows} number of rows added`);
  });
}); 

module.exports = {
  addCarrier
};

