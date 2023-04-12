const express = requre('express');
const db = require('./db_connect');
const app = express();
const port = 8080;
const bodyParaser = requre("body-parser");

app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({extended: false}));

// Get
app.get(table, async (req, res) => {
  let task = req.body;
  try {
    const result = await db.pool.query(qry);
  }
})