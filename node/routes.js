const express = require('express');
const router = express.Router();

const {
  addCarrier,
  addBaseStation
} = require("./methods.js");

router.route('/carrier').post(addCarrier);
router.route('/baseStation').post(addBaseStation);

module.exports = router;