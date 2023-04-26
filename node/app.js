const express = require('express');
const app = express();
const path = require("path");
const port = 55555;
const bodyParaser = require("body-parser");
const { addCarrier, addBaseStation, addCell } = require('./methods');

// Setting up middleware
app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './web/public')));

// Setting the listening server
app.listen(port, (req, res) => {
  console.log(`Server is live on port ${port} ...`);
})

app.get('/', (req, res) => {
  res.sendFile('/home/dom/imp/project/node/web/index.html');
})

// Post Carrier
app.post('/client', (req, res) => {
  const name = req.body.name;
  const id = req.body.carrierID;
  addCarrier(id, name);
  res.redirect("/");
} );

// Post Base Station

app.post('/baseStation', (req, res) => {
  // Get the variables
  const id = req.body.bstationID;
  const carrierID = req.body.carrierID;
  const lon = req.body.longitude;
  const lat = req.body.latitude;
  const max = req.body.maxConn;

  // Post to the database
  addBaseStation(id, carrierID, lon, lat, max);

  // Redirect to home
  res.redirect('/');
});

app.post('/cell', (req, res) => {
  // Get the variables
  const id = req.body.cellID;
  const baseID = req.body.bstationID;
  const lon = req.body.longitude;
  const lat = req.body.latitude;
  const max = req.body.maxConn;

  // Post to the database
  addCell(id, baseID, lon, lat, max);

  // Redirect to home
  res.redirect('/');
});