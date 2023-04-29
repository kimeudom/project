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

// CSV uploads
const {
  addCarriers,
  addBaseStations,
  addCells,
  addClients,
  addZones
} = require("./fileUpload.js");

router.route('/carrier').post(addCarrier);
router.route('/carriers').post(addCarriers);
router.route('/baseStation').post(addBaseStation);
router.route('/baseStations').post(addBaseStations);
router.route('/cell').post(addCell);
router.route('/cells').post(addCells);
router.route('/client').post(addClient);
router.route('/clients').post(addClients);
router.route('/zone').post(addZone);
router.route('/zones').post(addZones);

module.exports = router;