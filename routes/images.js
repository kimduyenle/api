var express = require('express');
var router = express.Router();
const { uploader } = require('../utils/uploadImage');

const imageController = require('../controllers/ImageController');

// router.get('/', statusController.getAllStatuses);

// router.get('/:id', statusController.getStatus);

router.post(
	'/:productId',
	uploader.single('image'),
	imageController.uploadProductImage
);

router.post('/default/:productId', imageController.setDefaultImage);

router.put('/delete/:id', imageController.deleteImage);

module.exports = router;
