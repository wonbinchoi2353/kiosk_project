const ItemsService = require("../services/item.service");

class ItemsController {
  itemsService = new ItemsService();

  postItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;

      await this.itemsService.postItem(name, price, type);

      res.status(201).json({ message: "상품 생성에 성공했습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "상품 생성에 실패했습니다." });
    }
  };
}

module.exports = ItemsController;
