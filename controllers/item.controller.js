const ItemsService = require("../services/item.service");

class ItemsController {
  itemsService = new ItemsService();

  postItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;

      await itemsService.postItem(name, price, type);
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ errorMessage: "상품 생성에 실패했습니다." });
    }
  };
}

module.exports = ItemsController;
