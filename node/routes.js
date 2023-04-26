const express = require('express');
const router = express.Router();

const {
  addCarrier,
  addBaseStation,
  addCell
} = require("./methods.js");

router.route('/carrier').post(addCarrier);
router.route('/baseStation').post(addBaseStation);
router.route('/cell').post(addCell);

module.exports = router;