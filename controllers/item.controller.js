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
      if (error.message === "이름과 가격이 없다!") {
        return res.status(403).json({ message: "이름과 가격을 입력해주세요." });
      } else if (error.message === "타입이 틀렸다!") {
        return res.status(403).json({ message: "알맞은 타입을 지정해주세요." });
      }

      res.status(500).json({ errorMessage: "상품 생성에 실패했습니다." });
    }
  };
}

module.exports = ItemsController;
