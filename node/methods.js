// Handles all post and get operations
const db= require('./db_connect');

// map methods
const {
  inBroadcastCircle,
  inRange
} = require('./map');

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

const addClient = (tel, cellID, baseID, status, categories, latitude, longitude) => db.getConnection().then(function (conn) {
  if (status ===  "on") {
    status = 1;
  }
  statement = `INSERT INTO clients(tel, cellID, baseID, connectionStatus, categories, latitude, longitude) VALUES("${tel}","${cellID}","${baseID}","${status}", "${categories}", "${latitude}" , "${longitude}" )`;
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

const sendMsg = (msg, lat, lng, radius) => db.getConnection().then(async (conn) => {
  timestmp = Date.now()
  statement = `INSERT INTO msgPayload(id, msg, lat, lng, radius) VALUES ("${timestmp}", "${msg}", "${lat}", "${lng}", "${radius}")`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  });

  // Broadcast to select clients
  clientsStatement = "Select tel, cellID, latitude, longitude from clients";

  // 
  const clients = await conn.query(clientsStatement);
  console.log(clients)
  const noOfClients = clients.length

  for (let i = 0; i < noOfClients; i++){
    let clientCoords = {lat: parseFloat(clients[i].latitude), lng: parseFloat(clients[i].longitude)};
    let BroadcastCircleCoords = {lat: lat, lng: lng};

    if (inBroadcastCircle(clientCoords, BroadcastCircleCoords, radius)) {
      // Get the cell coords
      cellStatement = `SELECT latitude, longitude FROM cells WHERE id="${clients[i].cellID}"`;
      const cell = await conn.query(cellStatement);
      let cellCoords = { lat: cell[0].latitude, lng: cell[0].longitude };

      if (inRange(clientCoords, cellCoords, 1000)) {
        msgStatement = `INSERT INTO msg(msgID, clientID) VALUES ("${timestmp}", "${clients[i].tel}")`;

        conn.query(msgStatement, (err, res) => {
          if (err) throw err;
        });
      }
    }
  }
});

module.exports = {
  addCarrier,
  addBaseStation,
  addCell,
  addClient,
  addZone,
  sendMsg
};