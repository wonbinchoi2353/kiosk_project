const { sequelize } = require("../models/index");
const {
  Item,
  Order_item,
  Item_order_customer,
  Order_customer,
  Option,
} = require("../models");

class OrderCustomerRepository {
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
    // 매개변수
    return await Item.findByPk(id);
  };

  // 모든 아이템 조회
  getAllItems = async () => {
    return await Item.findAll();
  };

  // order_item_id pk로 아이템 조회
  getItemsByOrderItemPk = async (id) => {
    return await Order_item.findByPk(id);
  };

  // 주문 번호 생성
  createOrderCustomer = async () => {
    return await Order_customer.create();
  };

  // 주문서 생성
  createItemOrderCustomer = async (item_id, amount, orderNumber, price) => {
    return await Item_order_customer.create({
      item_id,
      amount,
      order_customer_id: orderNumber,
      price,
    });
  };

  // 고객 상품 주문 수정
  putOrderCustomer = async () => {
    // const t = await sequelize.transaction();
    // 주문 완료
    try {
      // await Order_customer.update({ state: true });
      // 아이템 재고 수정(주문한 아이템 수만큼)
      // await Item.decrement({ amount });
      // await t.commit();
    } catch (error) {
      console.log(error);
      // await t.rollback();
    }
  };
}

module.exports = OrderCustomerRepository;
