const express = require('express');
const router = express.Router();

const {
  addCarrier,
  addBaseStation,
  addCell,
  addClient
} = require("./methods.js");

router.route('/carrier').post(addCarrier);
router.route('/baseStation').post(addBaseStation);
router.route('/cell').post(addCell);
router.route('/clients').post(addClient);

module.exports = router;