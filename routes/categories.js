var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategory);

router.post('/', categoryController.createCategory);

router.put('/:id', categoryController.updateCategory);

router.put('/delete/:id', categoryController.deleteCategory);

module.exports = router;
