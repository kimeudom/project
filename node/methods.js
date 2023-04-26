// Handles all post and get operations
const db= require('./db_connect');

// Insert value in the clients table
const addCarrier = (id, name) => db.getConnection().then(function (conn) {
  statement = `INSERT INTO carriers(id, carrierName) VALUES("${id}","${name}")`;
  conn.query(statement, function (err, result) {
    if (err) throw err;
  });
}); 

// Insert value in the base stations table

const addBaseStation = (id, carrierID, longitude, latitude, maxConnected) => db.getConnection().then(function (conn) {
  statement = `INSERT INTO bstations(id, carrierID, longitude, latitude, maxConnected) VALUES("${id}","${carrierID}","${longitude}","${latitude}","${maxConnected}")`;
  conn.query(statement, function (err, result) {
    if (err) throw err;
  });
});

const addCell = (id, baseID, longitude, latitude, maxConnected) => db.getConnection().then(function (conn) {
  statement = `INSERT INTO cells(id, baseID, longitude, latitude, maxConnected) VALUES ("${id}","${baseID}","${longitude}","${latitude}","${maxConnected}")`;
  conn.query(statement, function (err, result) {
    if (err) throw err;
  });
});

const addClient = (tel, cellID, baseID, lastConnectedZone, lastConnectedBase, categories) => db.getConnection().then(function (conn) {
  let status = 0;
  if (categories === "on") {
    status = 1;
  }
  statement = `INSERT INTO clients(tel, cellID, baseID, lastConnectedZone, lastConnectedBase, connectionStatus) VALUES("${tel}","${cellID}","${baseID}","${lastConnectedZone}","${lastConnectedBase}","${status}")`;
  conn.query(statement, function (err, result) {
    if (err) throw err;
  });
});

module.exports = {
  addCarrier,
  addBaseStation,
  addCell,
  addClient
};

