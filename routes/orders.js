var express = require('express');
var router = express.Router();
const auth = require('../utils/auth');
const orderController = require('../controllers/OrderController');

router.get('/', orderController.getAllOrders);

router.get('/pagination', orderController.getOrdersPerPage);

router.get('/user', orderController.getOrdersOfUser);

router.get('/owner', orderController.getOrdersOfOwner);

router.get('/status/:statusId', orderController.getOrdersOfStatus);

router.get('/:id', orderController.getOrder);

router.post('/', orderController.createOrder);

router.put('/:id/', orderController.updateOrder);

router.put('/:id/status', orderController.updateOrderStatus);

router.put('/delete/:id', orderController.deleteOrder);

module.exports = router;
