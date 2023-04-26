// Adds a client from the clients button
const db = require("./db_connect");

// Insert value in the clients table
const addCarrier = (value) => db.getConnection().then(function (conn) {
  statement = "INSERT INTO carriers(id, carrierName) VALUES ?";
  conn.query(statement, value, function (err, result) {
    if (err) throw err;
    console.log(`${result.affectedRows} number of rows added`);
  });
}); 

module.exports = {
  addCarrier
}



addCarrier()
