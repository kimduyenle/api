var express = require('express');
var router = express.Router();

const reviewController = require('../controllers/ReviewController');

router.get('/', reviewController.getAllReviews);

router.get('/pagination', reviewController.getReviewsPerPage);

router.get('/product/:productId', reviewController.getReviewsOfProduct);

router.get('/:id', reviewController.getReview);

router.post('/', reviewController.createReview);

// router.put('/:id', reviewController.updateProduct);

router.put('/delete/:id', reviewController.deleteReview);

module.exports = router;
