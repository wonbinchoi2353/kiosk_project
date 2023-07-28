const express = require("express");
const router = express.Router();

const ItemsController = require("../controllers/item.controller");
const itemsController = new ItemsController();

router.post("/items", itemsController.postItem);
router.get("/items", itemsController.getItems);
router.delete("/items/:id", itemsController.deleteItem);
router.put("/items/:id", itemsController.updateItem);

module.exports = router;
