const ItemsService = require("../services/item.service");

class ItemsController {
  itemsService = new ItemsService();

  // 상품 생성
  postItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;

      await this.itemsService.postItem(name, price, type);

      res.status(201).json({ message: "상품 생성에 성공했습니다." });
    } catch (error) {
      console.log(error);
      // 에러 메세지에 따라 상태 코드가 다양할 때
      if (error.message === "이름과 가격을 입력해주세요.") {
        return res.status(403).json({ message: "이름과 가격을 입력해주세요." });
      } else if (error.message === "알맞은 타입을 지정해주세요.") {
        return res.status(403).json({ message: "알맞은 타입을 지정해주세요." });
      } else if (error.message === "상품이 있다!") {
        return res.status(409).json({ message: "이미 존재하는 상품입니다." });
      }
      res.status(500).json({ errorMessage: "상품 생성에 실패했습니다." });
    }
  };

  // 상품 조회
  getItems = async (req, res) => {
    try {
      // const { type } = req.body;
      const { type } = req.query;
      const items = await this.itemsService.getItems(type);

      res.status(200).json({ items });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "상품 조회에 실패했습니다." });
    }
  };

  // 상품 삭제
  deleteItem = async (req, res) => {
    try {
      const { item_id } = req.query;

      await this.itemsService.deleteItem(item_id);

      res.status(200).json({ message: "상품 삭제에 성공했습니다." });
    } catch (error) {
      console.log(error);
      if (error.message === "해당하는 상품이 없습니다.") {
        return res.status(412).json({ message: "해당하는 상품이 없습니다." });
      } else if (error.message === "상품 삭제를 취소했습니다.") {
        return res.status(403).json({ message: "상품 삭제를 취소했습니다." });
      }
      res.status(500).json({ errorMessage: "상품 삭제에 실패했습니다." });
    }
  };

  // 상품 수정
  updateItem = async (req, res) => {
    try {
      const { item_id } = req.params;
      const { name, price } = req.body;

      await this.itemsService.updateItem(item_id, name, price);
      res.status(200).json({ message: "상품 수정에 성공하였습니다." });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(403).json({ message: error.message });
      }
      res.status(500).json({ errorMessage: "상품 수정에 실패했습니다." });
    }
  };
}

module.exports = ItemsController;
