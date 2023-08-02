const express = require("express");
const router = express.Router();

const OrderItemsController = require("../controllers/order-item.controller");
const orderItemsController = new OrderItemsController();

// 상품 발주
router.post("/items/:item_id/order_item", orderItemsController.orderItem);
router.put("/order_item/:order_item_id", orderItemsController.putOrderStatus);

module.exports = router;
