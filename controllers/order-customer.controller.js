const OrderCustomersService = require("../services/order-customer.service");

class OrderCustomersController {
  orderCustomersService = new OrderCustomersService();

  // 고객 상품 주문
  postOrderCustomer = async (req, res) => {
    try {
      const items = req.body;

      const { orderNumber, orderAmount } =
        await this.orderCustomersService.postOrderCustomer(items);

      // 주문 번호와 총 가격 반환
      res.status(200).json({
        message: `주문 번호: ${orderNumber}, 주문 총액: ${orderAmount}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    }
  };

  // 고객 상품 주문 수정
  putOrderCustomer = async () => {
    return await this.orderCustomersService.putOrderCustomer();
  };
}

module.exports = OrderCustomersController;
