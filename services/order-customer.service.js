const OrderCustomersRepository = require("../repositories/order-customer.repository");

class OrderCustomersService {
  orderCustomersRepository = new OrderCustomersRepository();

  // 고객 상품 주문
  postOrderCustomer = async (items) => {
    // 주문 번호 생성
    const { id: orderNumber } =
      await this.orderCustomersRepository.createOrderCustomer();

    // 아이템 주문 수에 따른 주문 액수
    const item = await this.orderCustomersRepository.getItemsByPk(item_id); // 인자
    const price = item.price * amount;

    // 주문서 생성, 주문 총액 반환 필요
    const { amount: orderAmount } =
      await this.orderCustomersRepository.createItemOrderCustomer(
        item_id,
        amount,
        orderNumber,
        price
      );

    let orderData = {};
    orderData.orderNumber = orderNumber;
    orderData.orderAmount = orderAmount;
    return orderData;
  };

  // 고객 상품 주문 수정
  putOrderCustomer = async () => {
    return await this.orderCustomersRepository.putOrderCustomer();
  };
}

module.exports = OrderCustomersService;
