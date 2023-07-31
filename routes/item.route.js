const express = require("express");
const router = express.Router();

const ItemsController = require("../controllers/item.controller");
const itemsController = new ItemsController();

router.post("/items", itemsController.postItem);
router.get("/items", itemsController.getItems);
router.delete("/items/", itemsController.deleteItem);
router.put("/items/:item_id", itemsController.updateItem);
router.post("/items/:item_id/order_item", itemsController.orderItem);
router.put(
  "/items/:item_id/order_item/:order_item_id",
  itemsController.orderStatusChange
);

module.exports = router;
