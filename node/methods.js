// Handles all post and get operations
const db= require('./db_connect');

///////////////////////////////////////////////////////////////////////////////

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

const addClient = (tel, cellID, baseID, lastConnectedCell, lastConnectedBase, status, categories) => db.getConnection().then(function (conn) {
  if (status ===  "on") {
    status = 1;
  }
  statement = `INSERT INTO clients(tel, cellID, baseID, lastConnectedCell, lastConnectedBase, connectionStatus, categoriee) VALUES("${tel}","${cellID}","${baseID}","${lastConnectedCell}","${lastConnectedBase}","${status}", "${categories}" )`;
  conn.query(statement, function (err, result) {
    if (err) throw err;
  });
});

// CSV support

const addZone = (zoneID, zoneName, longitude, latitude, radius) => db.getConnection().then(function (conn) {
  statement = `INSERT INTO zones(zoneID, zoneName, longitude, latitude, radius) VALUES ("${zoneID}","${zoneName}","${longitude}","${latitude}", "${radius}")`;
  conn.query(statement, function (err, res) {
    if (err) throw err;
    return res;
  });
}); 

const sendMsg = (msg, lat, lng, radius) => db.getConnection().then((conn) => {
  timestmp = Date.now()
  console.log(timestmp)
  console.log(lat)
  console.log(lng)
  console.log(radius)
  statement = `INSERT INTO msgPayload(id, msg, lat, lng, radius) VALUES ("${timestmp}", "${msg}", "${lat}", "${lng}", "${radius}")`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  });
  msgStatement = `INSERT INTO msg(id, clientID, categories) VALUES ("${timestmp}", "+254700005272", "General Public")`;
  conn.query(msgStatement, (err, res) => {
    if (err) throw err;
  });
});

module.exports = {
  addCarrier,
  addBaseStation,
  addCell,
  addClient,
  addZone,
  sendMsg
};

