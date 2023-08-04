const OrderCustomersRepository = require("../repositories/order-customer.repository");

class OrderCustomersService {
  orderCustomersRepository = new OrderCustomersRepository();
  // 고객 상품 주문
  postOrderCustomer = async (items) => {
    return await this.orderCustomersRepository.createOrderCustomer(items);
  };

  // 고객 주문 조회
  getOrderCustomer = async (order_customer_id) => {
    return await this.orderCustomersRepository.getOrderCustomer(
      order_customer_id
    );
  };

  // 고객 주문 수정
  putOrderCustomer = async (order_customer_id, state) => {
    return await this.orderCustomersRepository.putOrderCustomer(
      order_customer_id,
      state
    );
  };
}

module.exports = OrderCustomersService;
