const OrderCustomersService = require("../services/order-customer.service");

class OrderCustomersController {
  orderCustomersService = new OrderCustomersService();
  // 고객 상품 주문
  postOrderCustomer = async (req, res) => {
    try {
      const { items } = req.body;

      const { order_customer_id, totalPrice } =
        await this.orderCustomersService.postOrderCustomer(items);

      // 주문 번호와 총 가격 반환
      res.status(200).json({
        message: `주문 번호: ${order_customer_id}번, 상품 총액: ${totalPrice}원`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    }
  };

  // 고객 주문 조회
  getOrderCustomer = async (req, res) => {
    try {
      const { order_customer_id } = req.params;

      const orders = await this.orderCustomersService.getOrderCustomer(
        order_customer_id
      );
      console.log(orders);

      res.status(200).json({ message: orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    }
  };

  // 고객 주문 수정
  putOrderCustomer = async (req, res) => {
    try {
      const { order_customer_id } = req.params;
      const { state } = req.body;

      const data = await this.orderCustomersService.putOrderCustomer(
        order_customer_id,
        state
      );

      if (data.message) {
        return res.status(200).json({ message: data.message });
      }

      res.status(200).json({ message: "주문이 완료되었습니다." });
    } catch (error) {
      console.log(error);
      if (error.message === "완료된 주문은 취소할 수 없습니다") {
        return res
          .status(400)
          .json({ message: "완료된 주문은 취소할 수 없습니다" });
      } else if (error.message === "주문이 이미 완료되었습니다.") {
        return res.status(400).json({ message: "주문이 이미 완료되었습니다." });
      }
      res.status(500).json({ errorMessage: error.message });
    }
  };
}

module.exports = OrderCustomersController;
