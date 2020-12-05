var express = require('express');
var router = express.Router();

const checkoutController = require('../controllers/CheckoutController');

router.post('/', checkoutController.payout);

module.exports = router;
