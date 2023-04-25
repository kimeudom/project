const express = require('express');
const router = express.Router();

const {
  addCarrier
} = require("./methods");

router.route('/carrier').post(addCarrier);

module.exports = router;