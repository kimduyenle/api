var express = require('express');
var router = express.Router();

const productController = require('../controllers/ProductController');

router.get('/', productController.getAllProducts);

router.get('/pagination', productController.getProductsPerPage);

router.get('/user', productController.getProductsOfUser);

router.get('/category/:categoryId', productController.getProductsOfCategory);

router.get('/type/:typeId', productController.getProductsOfType);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.put('/delete/:id', productController.deleteProduct);

module.exports = router;
