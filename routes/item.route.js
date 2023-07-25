const express = require("express");
const router = express.Router();

const ItemsController = require("../controllers/item.controller");
const itemsController = new ItemsController();

router.post("/items", itemsController.postItem);

module.exports = router;
