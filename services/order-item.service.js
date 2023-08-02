const OrderItemsRepository = require("../repositories/order-item.repository");
const { orderItemState } = require("../constants/constant");

class OrderItemsService {
  orderItemsRepository = new OrderItemsRepository();

  // 상품 발주
  orderItem = async (item_id, amount, state) => {
    // 주문 상태 숫자로 변환
    // { "ORDERED": 0, "PENDING": 1, "COMPLETED": 2, "CANCELED": 3 }
    state = orderItemState[state].toString();

    // 아이템 테이블에서 상품 있는지 확인
    const item = await this.orderItemsRepository.getItemsByPk(item_id);

    if (!item) {
      throw new Error("해당하는 상품이 없습니다.");
    }

    await this.orderItemsRepository.orderItem(item_id, amount, state);
  };

  // 발주 상태 수정
  putOrderStatus = async (order_item_id, state) => {
    state = orderItemState[state].toString();

    const orderItem = await this.orderItemsRepository.getItemsByOrderItemPk(
      order_item_id
    );

    if (!orderItem) {
      throw new Error("해당하는 상품 발주가 없습니다.");
    }

    const item = await this.orderItemsRepository.getItemsByPk(
      orderItem.item_id
    );

    if (!item) {
      throw new Error("해당하는 상품이 없습니다.");
    }

    try {
      return await this.orderItemsRepository.putOrderStatus(
        order_item_id,
        state
      );
    } catch (error) {
      console.log(error);
      throw new Error("상품 상태 수정에 실패했습니다.");
    }
  };
}

module.exports = OrderItemsService;
