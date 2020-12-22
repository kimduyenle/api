var express = require("express");
var router = express.Router();

const statisticsController = require("../controllers/StatisticsController");

router.get("/", statisticsController.statistics);

router.get("/export", statisticsController.export);

module.exports = router;
