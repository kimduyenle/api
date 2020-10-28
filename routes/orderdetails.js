var express = require('express');
var router = express.Router();

const orderDetailController = require('../controllers/OrderDetailController');

router.get('/', orderDetailController.getAllOrderDetails);

router.get('/pagination', orderDetailController.getOrderDetailsPerPage);

router.get('/order/:orderId', orderDetailController.getOrderDetailsOfOrder);

router.get('/product/:productId', orderDetailController.getOrderDetailsOfProduct);

router.get('/:id', orderDetailController.getOrderDetail);

router.post('/', orderDetailController.createOrderDetail);

module.exports = router;