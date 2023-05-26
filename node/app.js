// CSV requirements 
const multer = require('multer');
const fs = require('fs');
const csv = require('fast-csv');

// Db requirements
const db= require('./db_connect');

// Pdf requirements
const PDFdocument = require('pdfkit');

// app requirements
const express = require('express');
const app = express();
const path = require("path");
const port = 55555;
const bodyParaser = require("body-parser");
const http = require("http");
const fetch = require("fetch");
///////////////////////////////////////////////////////////////////////////////

// Single post methods
const {
  addCarrier,
  addBaseStation,
  addCell,
  addClient,
  addZone,
  sendMsg,
} = require('./methods');

// CSV methods
const {
  addCarriers,
  addBaseStations,
  addCells,
  addClients,
  addZones
} = require('./fileUpload');

// Map methods
const {
  getBases
} = require('./map')

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
  const connStatus = req.body.connStatus;
  const category = req.body.cagegory;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  // Post to the database
  addClient(tel, cell, base, connStatus, category, latitude, longitude);
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

// Post msg payload

app.post('/sendMsg', (req, res) => {
  // Get the variables 
  const msg = req.body.msg;
  const lat = req.body.latitude;
  const lng = req.body.longitude;
  const rad = req.body.radius;

  sendMsg(msg, lat, lng, rad);
  res.redirect('/')
})


app.get('/getBases/:carrierID', async (req, res) => {
  const carrierID = req.params.carrierID;
  statement = `SELECT latitude, longitude FROM bstations WHERE carrierID = "${carrierID}"`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    res.status(200).json(rows);
  }
  catch(err) {
    if (err) throw err;
  }
  finally {
    if (conn) conn.release();
  }
})

app.get('/getAllBases/', async (req, res) => {
  statement = `SELECT latitude, longitude FROM bstations`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    res.status(200).json(rows);
  }
  catch(err) {
    if (err) throw err;
  }
  finally {
    if (conn) conn.release();
  }
})


app.get('/getCells/:baseID', async (req, res) => {
  const baseID = req.params.baseID;
  statement = `SELECT latitude, longitude FROM cells WHERE baseID="${baseID}"`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    res.status(200).json(rows);
  } catch (err) {
    if (err) throw err;
  }
  finally {
    if (conn) conn.release();
  }
})

app.get('/getAllCells/', async (req, res) => {
  statement = `SELECT latitude, longitude FROM cells`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    res.status(200).json(rows);
  } catch (err) {
    if (err) throw err;
  }
  finally {
    if (conn) conn.release();
  }
})

app.get('/getCarriers', async (req, res) => {
  statement = "SELECT * FROM carriers";
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    res.status(200).json(rows);
  } catch (err) {
    if (err) throw err;
  }
  finally {
    if (conn) conn.release();
  }
})

// Return records from most newest to oldest
app.get('/getRecords', async (req, res) => {
  statement = `SELECT * FROM msgPayload ORDER BY id DESC`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    var noOfRows = rows.length;
    var output = [];

    // Getting the final output
    for (var i = 0; i < noOfRows; i++){
      var obj = rows[i];
      var stringifiedVal = obj.id.toString();

      var newObj = {
        id: stringifiedVal,
        msg: rows[i].msg,
        lat: rows[i].lat,
        lng: rows[i].lng,
        radius: rows[i].radius
      };
      output.push(newObj);
    }

    res.status(200).json(output);
  } catch (err) {
    if (err) throw err;
  } finally {
    if (conn) conn.release();
  }
})

// Returns the broadcast data
app.get('/getMsgs/:tel', async (req, res) => {
  let tel = req.params.tel;
  statement = `SELECT mp.msg FROM msgPayload AS mp LEFT JOIN msg AS m ON mp.id = m.msgID WHERE m.clientid = ${tel} ORDER BY m.id DESC`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    res.status(200).json(rows);
  } catch (err) {
    if (err) throw err;
  } finally{
    if (conn) conn.release();
  }

})

async function getRecords() {
  statement = `SELECT * FROM msgPayload ORDER BY id DESC`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    var noOfRows = rows.length;
    var output = [];

    // Getting the final output
    for (var i = 0; i < noOfRows; i++){
      var obj = rows[i];
      var stringifiedVal = obj.id.toString();

      var newObj = {
        id: stringifiedVal,
        msg: rows[i].msg,
        lat: rows[i].lat,
        lng: rows[i].lng,
        radius: rows[i].radius
      };
      output.push(newObj);
    }

    return output;
  } catch (err) {
    if (err) throw err;
  } finally {
    if (conn) conn.release();
  }
}

app.get("/transactionalReport", async (req, res) => {
  statement = `SELECT * FROM msgPayload ORDER BY id DESC`;
  try {
    conn = await db.getConnection();
    const rows = await conn.query(statement);
    var noOfRows = rows.length;
    var results = [];

    // Getting the final output
    for (var i = 0; i < noOfRows; i++) {
      var obj = rows[i];
      var stringifiedVal = obj.id.toString();
    // Get individual components of the date and time
      var timestamp = new Date(parseInt(obj.id));
      var time = timestamp.toLocaleTimeString();
      var date = timestamp.toLocaleDateString();
      var rad = (rows[i].radius / 1000).toFixed(2);
      var newObj = {
        id: `${date} ${time}`,
        msg: rows[i].msg,
        // lat: rows[i].lat,
        // lng: rows[i].lng,
        radius: rad 
      };
      results.push(newObj);
    }
    // Preparing the document
    const doc = new PDFdocument();
    doc.pipe(res);

    // Set up table headers
      const headers = ['id', 'Message', "Radius"]; // Replace with your actual column names
      doc.font('Helvetica-Bold').fontSize(12);
      headers.forEach((header, index) => {
        doc.text(header, 50 + index * 70, 50);
      });

      // Add data rows to the table
      doc.font('Helvetica').fontSize(10);
      results.forEach((row, rowIndex) => {
        Object.values(row).forEach((columnValue, columnIndex) => {
          doc.text(columnValue.toString(), 50 + columnIndex * 140, 70 + (rowIndex + 1) * 20);
        });
      });

      // Finalize the PDF and send it as the response
      doc.end();

  } catch (err) {
    if (err) throw err;
  } finally {
    if (conn) conn.release();
  }
  })