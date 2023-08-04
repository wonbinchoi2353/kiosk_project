const { sequelize } = require("../models/index");
const { Item, Order_item } = require("../models");

class OrderItemsRepository {
  // pk로 아이템 조회
  getItemsByPk = async (id) => {
    // 매개변수
    return await Item.findByPk(id);
  };

  // 상품 발주
  orderItem = async (item_id, amount, state) => {
    return await Order_item.create({ item_id, amount, state });
  };

  // order_item_id pk로 아이템 조회
  getItemsByOrderItemPk = async (id) => {
    return await Order_item.findByPk(id);
  };

  // 상품 발주 상태 수정
  putOrderStatus = async (id, state) => {
    const t = await sequelize.transaction(); // 트랜잭션 시작

    try {
      // 상품 발주 상태 확인용
      const orderItem = await Order_item.findByPk(id, {
        transaction: t,
      });

      // 상품 수량 확인용
      const item = await Item.findByPk(orderItem.item_id, {
        transaction: t,
      });

      // 발주 상태 수정
      await Order_item.update(
        { state },
        { where: { id }, transaction: t } // where 절 안에 있어야 작동하는 걸까?
      );

      // 상품 발주 상태가 PENDING 이면서 COMPLETED 로 수정하고 있다면
      if (orderItem.state === "1" && state === "2") {
        // 아이템 테이블에서 orderItem의 amount 만큼 상품 amount 증가
        await Item.increment(
          { amount: orderItem.amount },
          { where: { id: orderItem.item_id }, transaction: t } // 트랜잭션 적용
        );
      }

      // 상품 발주 상태가 COMPLETED에서 변경될 경우
      if (orderItem.state === "2" && state !== "2") {
        // 아이템 수량이 아이템 오더 수량보다 크거나 같으면 수량 감소
        if (item.amount >= orderItem.amount) {
          await Item.decrement(
            { amount: orderItem.amount },
            { where: { id: orderItem.item_id }, transaction: t }
          );
        } else {
          throw new Error(
            "현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다."
          );
        }
      }

      await t.commit(); // 트랜잭션 사용한 모든 로직 commit, db에 반영
    } catch (error) {
      console.log(error);
      await t.rollback(); // 트랜잭션 중 하나라도 실패하면 전부 롤백
    }
  };
}

module.exports = OrderItemsRepository;
