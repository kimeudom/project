// Contains get and set operation for the google maps page
const db= require('./db_connect');

///////////////////////////////////////////////////////////////////////////////

const getBases = (carrierID) => db.getConnection().then((conn) => {
  statement = `SELECT latitude, longitude FROM bstations WHERE carrierID = "${carrierID}"`;
  conn.query(statement, (err, res, fields) => {
    console.log(res);
    return res;
    if (err) throw err;
  });
});


module.exports = {
  getBases
}