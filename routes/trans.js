var express = require('express');
var router = express.Router();

const transportationController = require('../controllers/TransportationController');

router.get('/', transportationController.getAllTrans);

module.exports = router;
