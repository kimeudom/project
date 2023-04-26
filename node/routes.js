const express = require('express');
const router = express.Router();

// All the methods from methods.js
const {
  addCarrier,
  addBaseStation,
  addCell,
  addClient,
  addZone
} = require("./methods.js");

router.route('/carrier').post(addCarrier);
router.route('/baseStation').post(addBaseStation);
router.route('/cell').post(addCell);
router.route('/clients').post(addClient);
router.route('/zone').post(addZone);

module.exports = router;