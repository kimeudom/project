// CSV requirements 
const multer = require('multer');
const fs = require('fs');
const csv = require('fast-csv');

// app requirements
const express = require('express');
const app = express();
const path = require("path");
const port = 55555;
const bodyParaser = require("body-parser");
///////////////////////////////////////////////////////////////////////////////

// Single post methods
const {
  addCarrier,
  addBaseStation,
  addCell,
  addClient,
  addZone,
} = require('./methods');

// CSV methods
const {
  addCarriers,
  addBaseStations,
  addCells,
  addClients,
  addZones
} = require('./fileUpload');

// Setting up middleware
app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './web/public')));

// Setting the listening server
app.listen(port, (req, res) => {
  console.log(`Server is live on port ${port} ...`);
})

///////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile('/home/dom/imp/project/node/web/index.html');
})

// Multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/') // save file to the /tmp linux temporary location
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // use the original filename
  }
})

var upload = multer({ storage: storage })

// Send to /tmp directory
function send(csvUrl) {
  let stream = fs.createReadStream(csvUrl)
  let dataCSV =  []
  let csvFileStream = csv
    .parse({headers: true})
    .on('data', function (data) {
      dataCSV.push();
    })
    .on('end', function () {
    })
  stream.pipe(csvFileStream)
  return csvUrl;
}

// Post Carrier
app.post('/carrier', (req, res) => {
  const name = req.body.name;
  const id = req.body.carrierID;
  addCarrier(id, name);
  res.redirect("/");
} );

// Post Carriers
app.post('/carriers', upload.single('csv'), async (req, res) => {
  addCarriers(send('/tmp/' + req.file.filename))
  res.redirect('/');
});

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

// Post Base Stations
app.post('/baseStations', upload.single('csv'), async (req, res) => {
  addBaseStations(send('/tmp/' + req.file.filename));
  res.redirect('/');
})


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

// Post cells csv
app.post('/cells', upload.single('csv'), async (req, res) => {
  addCells(send('/tmp/' + req.file.filename));
  res.redirect('/')
})

app.post('/client', (req, res) => {
  // Get the variables
  const tel = req.body.tel;
  const cell = req.body.cellID;
  const base = req.body.baseID;
  const lastCell = req.body.lastCellID;
  const lastBase = req.body.lastBaseID;
  const connStatus = req.body.connStatus;
  const category = req.body.cagegory;
  // Post to the database
  addClient(tel, cell, base, lastCell, lastBase, connStatus, category);
  // Redirect to home
  res.redirect('/');

});

app.post('/clients', upload.single('csv'), async (req, res) => {
  addClients(send('/tmp/' + req.file.filename));
  res.redirect('/');
})

app.post('/zone', (req, res) => {
  // Get the variables
  const zone = req.body.zoneID;
  const name = req.body.name;
  const lat = req.body.latitude;
  const lon = req.body.longitude;
  const rad = req.body.radius;


  // Post to the database
  addZone(zone, name, lat, lon, rad);

  // Redirect to home
  res.redirect('/');
});

// Adding zones csv

app.post('/zones', upload.single('csv'), async (req, res) => {
  addZones(send('/tmp/' + req.file.filename));
  res.redirect('/');
});