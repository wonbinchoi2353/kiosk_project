const express = require("express");
const router = express.Router();

const ItemsController = require("../controllers/item.controller");
const itemsController = new ItemsController();

// 상품
router.post("/item", itemsController.postItem);
router.get("/items", itemsController.getItems);
router.delete("/item", itemsController.deleteItem);
router.put("/item/:item_id", itemsController.updateItem);

module.exports = router;
