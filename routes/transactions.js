var express = require("express");
var router = express.Router();

const transactionController = require("../controllers/TransactionController");

router.get("/", transactionController.getAllTransaction);

router.post("/", transactionController.createTransaction);

module.exports = router;
