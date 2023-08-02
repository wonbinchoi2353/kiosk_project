const express = require("express");
const router = express.Router();

const OrderCustomersController = require("../controllers/order-customer.controller");
const orderCustomersController = new OrderCustomersController();

// 고객 주문
router.post("/orders", orderCustomersController.postOrderCustomer);
router.put(
  "/orders/item_order_customer_id",
  orderCustomersController.putOrderCustomer
);

module.exports = router;
