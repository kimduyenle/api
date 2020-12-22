var express = require("express");
var router = express.Router();

const orderHistoryController = require("../controllers/OrderHistoryController");

router.get("/", orderHistoryController.getAllOrderHistories);

// router.get('/pagination', cartController.getCartsPerPage)

router.get("/order/:orderId", orderHistoryController.getOrderHistoriesOfOrder);

router.get("/:id", orderHistoryController.getOrderHistory);

router.post("/", orderHistoryController.createOrderHistory);

// router.put('/:productId', cartController.updateCartQuantity);

// router.put('/delete/:cartId', cartController.deleteCart)

module.exports = router;
