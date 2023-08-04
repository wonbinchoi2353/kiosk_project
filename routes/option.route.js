const express = require("express");
const router = express.Router();

const OptionsController = require("../controllers/option.controller");
const optionsController = new OptionsController();

// 옵션
router.post("/option", optionsController.createOption);
router.get("/options", optionsController.getOptions);
router.delete("/option/:option_id", optionsController.deleteOptions);

module.exports = router;
