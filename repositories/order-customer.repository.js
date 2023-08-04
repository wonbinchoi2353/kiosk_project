const { sequelize } = require("../models/index");
const {
  Item,
  Order_item,
  Item_order_customer,
  Order_customer,
  Option,
} = require("../models");

class OrderCustomerRepository {
  // 고객 상품 주문 (결제X)
  createOrderCustomer = async (items) => {
    // 주문 번호 생성
    const { id: order_customer_id } = await Order_customer.create();

    // 주문서 총액 저장
    let totalPrice = 0;

    // itmes 순회 하면서 주문서 만들기
    for (let i of items) {
      // 옵션,아이템 1:1일 때 옵션 테이블 가져와서 입력값 계산
      const option = await Option.findOne({
        attributes: ["id", "extra_price", "shot_price", "hot"],
        where: { id: i.option_id },
      });

      // 사이즈 업 하지 않으면 추가 요금 없음
      if (!i.extra) {
        option.extra_price = 0;
      }
      // 샷 추가 갯수에 따라 요금 추가
      if (!i.shot) {
        option.shot_price = 0;
      } else {
        option.shot_price *= i.shot;
      }
      // 아이스 선택하려면 false
      if (!i.hot) {
        option.hot = false;
      }

      // 아이템 가격 가져오기
      let { price } = await Item.findByPk(i.item_id);

      // 주문서 하나씩 만들기
      const order = await Item_order_customer.create({
        item_id: i.item_id,
        order_customer_id,
        amount: i.amount,
        option,
        price: (price + option.extra_price + option.shot_price) * i.amount,
      });

      // 주문서 가격 더하기
      totalPrice += order.price;
    }

    return { orders, totalPrice };
  };

  // 고객 주문 조회
  getOrderCustomer = async (order_customer_id) => {
    return await Item_order_customer.findAll({ where: { order_customer_id } });
  };

  // 고객 상품 주문 수정 (결제)
  putOrderCustomer = async (order_customer_id, state) => {
    const t = await sequelize.transaction();

    try {
      // 현재 주문 상태 가져오기
      const { state: dbState } = await Order_customer.findByPk(
        order_customer_id
      );
      console.log(dbState);
      // 주문 상태가 true, 입력된 state 가 false 일 때
      if (dbState && !state) {
        throw new Error("완료된 주문은 취소할 수 없습니다");
        // 주문 상태가 false, 입력된 state 가 true 일 때
      } else if (!dbState && state) {
        // 주문 수정
        await Order_customer.update(
          { state },
          { where: { id: order_customer_id }, transaction: t }
        );
        // 현재 주문 상태가 false, 입력된 state 가 false일 때 주문 취소
        // 트랜잭션 진행하다 중간에 빠져도 괜찮을까?
      } else if (!dbState && !state) {
        await Item_order_customer.destroy({ where: { order_customer_id } });
        await Order_customer.destroy({ where: { id: order_customer_id } });
        return { message: "주문이 취소되었습니다." };
      } else {
        throw new Error("주문이 이미 완료되었습니다.");
      }

      // 각 주문서에서 item_id와 amount 가져와서 update 배열에 넣기
      const update = await Item_order_customer.findAll({
        attributes: ["item_id", "amount"],
        where: { order_customer_id },
        transaction: t,
      });

      // 배열 순환하면서 알맞은 아이템 테이블 amount 감소
      for (let i of update) {
        // 재고 감소할 아이템 조회
        const item = await Item.findAll({ where: { id: i.item_id } });

        // 현재 재고보다 주문량이 많으면 주문 실패
        if (item.amount < i.amount) {
          throw new Error("해당 상품의 재고가 부족합니다.");
        }

        // 아이템 재고 수정(주문한 아이템 수만큼)
        await Item.decrement(
          { amount: i.amount },
          { where: { id: i.item_id }, transaction: t }
        );
      }

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      throw new Error(error.message);
    }
  };
}

module.exports = OrderCustomerRepository;
