const OrderItemsService = require("../services/order-item.service");

class OrderItemsController {
  orderItemsService = new OrderItemsService();

  // 상품 발주
  orderItem = async (req, res) => {
    try {
      const { item_id } = req.params;
      const { amount, state } = req.body;

      await this.orderItemsService.orderItem(item_id, amount, state);

      res.status(201).json({ message: "상품 발주에 성공했습니다." });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(412).json({ message: error.message });
      }
      res.status(500).json({ errorMessage: error.message });
    }
  };

  // 발주 상태 수정
  putOrderStatus = async (req, res) => {
    try {
      const { order_item_id } = req.params;
      const { state } = req.body;

      await this.orderItemsService.putOrderStatus(order_item_id, state);

      res
        .status(200)
        .json({ message: `상품 발주 상태를 ${state}(으)로 수정했습니다.` });
    } catch (error) {
      console.log(error);
      if (error.message === "해당하는 상품이 없습니다.") {
        return res.status(404).json({ errorMessage: error.message });
      } else if (error.message === "해당하는 상품 발주가 없습니다.") {
        return res.status(404).json({ errorMessage: error.message });
      } else if (
        error.message ===
        "현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다."
      ) {
        return res.status(403).json({ errorMessage: error.message });
      }
      res.status(500).json({ errorMessage: error.message });
    }
  };
}

module.exports = OrderItemsController;
