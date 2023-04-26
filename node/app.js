const express = require('express');
const app = express();
const path = require("path");
const port = 55555;
const bodyParaser = require("body-parser");
const { addCarrier } = require('./methods');

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

