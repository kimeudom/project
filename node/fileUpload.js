const bodyParaser = require('body-parser');
const path = require('path');
const db = require('./db_connect');

///////////////////////////////////////////////////////////////////////////////

// Insert csv in carriers
const addCarriers = (csv) => db.getConnection().then((conn) => {
  statement = `LOAD DATA INFILE "${csv}" INTO TABLE carriers FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, carrierName)`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  });
});

// Insert csv in bstations
const addBaseStations = (csv) => db.getConnection().then((conn) => {
  statement = `LOAD DATA INFILE "${csv}" INTO TABLE bstations FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, carrierID, latitude, longitude, maxConnected)`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  });
});

// Insert csv in cells
const addCells = (csv) => db.getConnection().then((conn) => {
  statement = `LOAD DATA INFILE "${csv}" INTO TABLE cells FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, baseID, latitude, longitude, maxConnected)`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  });
});

const addClients = (csv) => db.getConnection().then((conn) => {
  statement = `LOAD DATA INFILE "${csv}" INTO TABLE clients FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS(tel, cellID, baseID, lastConnectedCell, lastConnectedBase, connectionStatus, categories)`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  })
})

const addZones = (csv) => db.getConnection().then((conn) => {
  statement = `LOAD DATA INFILE "${csv}" INTO TABLE zones FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS(zoneID, zoneName, latitude, longitude, radius)`;
  conn.query(statement, (err, res) => {
    if (err) throw err;
  })
})


///////////////////////////////////////////////////////////////////////////////
module.exports = {
  addCarriers,
  addBaseStations,
  addCells,
  addClients,
  addZones
}