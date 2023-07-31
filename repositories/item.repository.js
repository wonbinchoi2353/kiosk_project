const { sequelize } = require("../models/index");
const { Item, Order_item } = require("../models");

class ItemsRepository {
  // 아이템 생성
  createItem = async (name, price, type) => {
    return await Item.create({ name, price, type });
  };

  // 이름으로 아이템 찾기
  getItemByName = async (name) => {
    return await Item.findOne({ where: { name } });
  };

  // pk로 아이템 조회
  getItemsByPk = async (id) => {
    return await Item.findByPk(id);
  };

  // 모든 아이템 조회
  getAllItems = async () => {
    return await Item.findAll();
  };

  // 타입 일치하는 아이템 조회
  getItemsByType = async (type) => {
    return await Item.findAll({ where: { type } });
  };

  // pk로 아이템 삭제
  deleteItem = async (id) => {
    return await Item.destroy({ where: { id } });
  };

  // 아이템 수정
  updateItem = async (id, name, price) => {
    return await Item.update({ name, price }, { where: { id } });
  };

  // 상품 발주
  orderItem = async (item_id, amount, state) => {
    return await Order_item.create({ item_id, amount, state });
  };

  // order_item_id pk로 아이템 조회
  getItemsByOrderItemPk = async (order_item_id) => {
    let id;
    return await Order_item.findByPk((id = order_item_id));
  };

  // 상품 발주 상태 수정
  orderStatusChange = async (order_item_id, state) => {
    const t = await sequelize.transaction(); // 트랜잭션 시작
    let id;

    try {
      const orderItem = await Order_item.findByPk((id = order_item_id), {
        transaction: t,
      });

      const item = await Item.findByPk((id = order_item_id), {
        transaction: t,
      });

      // 발주 상태 수정
      await Order_item.update(
        { state },
        { where: { id: order_item_id }, transaction: t } // 해당 쿼리에 트랜잭션 적용
      );

      // 상품 발주 상태가 PENDING 이고 COMPLETED 로 수정하고 있다면
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

module.exports = ItemsRepository;
