var express = require('express');
var router = express.Router();

const cartController = require('../controllers/CartController');

router.get('/', cartController.getAllCarts);

router.get('/pagination', cartController.getCartsPerPage);

router.get('/user', cartController.getCartsOfUser);

router.get('/:id', cartController.getCart);

router.post('/', cartController.createCart);

router.put('/:productId', cartController.updateCartQuantity);

router.put('/delete/:productId', cartController.deleteCart);

module.exports = router;