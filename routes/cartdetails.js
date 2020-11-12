var express = require('express');
var router = express.Router();

const cartDetailController = require('../controllers/CartDetailController');

router.get('/', cartDetailController.getAllCartDetails);

router.get('/pagination', cartDetailController.getCartDetailsPerPage);

router.get('/cart/:cartId', cartDetailController.getCartDetailsOfCart);

// router.get('/product/:productId', cartDetailController.getOrderDetailsOfProduct);

router.get('/:id', cartDetailController.getCartDetail);

router.post('/', cartDetailController.createCartDetail);

router.put('/quantity', cartDetailController.updateCartDetailQuantity);

router.put('/delete', cartDetailController.deleteCartDetail);

module.exports = router;