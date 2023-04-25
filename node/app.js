const express = require('express');
const app = express();
const router = require('./routes');
const path = require("path");
const port = 42069;
const bodyParaser = require("body-parser");

// Setting the listening server
app.listen(port, (req, res) => {
  console.log(`Server is live on port ${port} ...`);
})

// Setting up middleware
app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './web/public')));


app.get('/client', (req, res) => {
  res.sendFile('/home/dom/imp/project/node/web/index.html');

});

// Post Carrier
app.post('/client', (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  addCarrier(id, name);
} );