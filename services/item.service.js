const ItemsRepository = require("../repositories/item.repository");
const IO = require("../readline/readline");
const { itemType, orderItemState } = require("../constants/constant");

class ItemsService {
  itemsRepository = new ItemsRepository();
  io = new IO();

  // 상품 생성
  postItem = async (name, price, type) => {
    if (!name || !price) {
      throw new Error("이름과 가격을 입력해주세요.");
    }

    const itemTypeString = JSON.stringify(itemType);

    // 알맞은 타입을 지정해주세요
    if (!itemTypeString.includes(type)) {
      throw new Error("알맞은 타입을 지정해주세요.");
    }

    const item = await this.itemsRepository.getItemByName(name);

    if (!item) {
      await this.itemsRepository.createItem(name, price, type);
    } else {
      // amount 확인
      // item.amount += 1;
      // await item.save();
      throw new Error("이미 존재하는 상품입니다.");
    }
  };

  // 상품 조회
  getItems = async (type) => {
    if (type) {
      return await this.itemsRepository.getItemsByType(type);
    } else {
      return await this.itemsRepository.getAllItems();
    }
  };

  // 상품 삭제
  deleteItem = async (item_id) => {
    const item = await this.itemsRepository.getItemsByPk((id = item_id));

    if (!item) {
      throw new Error("해당하는 상품이 없습니다.");
    } else if (item.amount) {
      // 입력값을 받아 '예'를 반환하면 아이템 삭제
      const input = await this.io.getInput();
      if (input === "예") {
        await this.itemsRepository.deleteItem(id);
      } else {
        throw new Error("상품 삭제를 취소했습니다.");
      }
    } else {
      await this.itemsRepository.deleteItem(id);
    }
  };

  // 상품 수정
  updateItem = async (item_id, name, price) => {
    if (!name) {
      throw new Error("이름을 입력해주세요");
    }

    if (price < 0) {
      throw new Error("알맞은 가격을 입력해주세요");
    }

    await this.itemsRepository.updateItem((id = item_id), name, price);
  };

  // 상품 발주
  orderItem = async (item_id, amount, state) => {
    // 주문 상태 숫자로 변환
    // { "ORDERED": 0, "PENDING": 1, "COMPLETED": 2, "CANCELED": 3 }
    state = orderItemState[state].toString();

    // 아이템 테이블과 발주 테이블의 id 이름이 다릅니다
    const id = item_id;
    // 아이템 테이블에서 상품 있는지 확인
    const item = await this.itemsRepository.getItemsByPk(id);

    if (!item) {
      throw new Error("해당하는 상품이 없습니다.");
    }

    await this.itemsRepository.orderItem(item_id, amount, state);
  };

  // 발주 상태 수정
  orderStatusChange = async (item_id, order_item_id, state) => {
    state = orderItemState[state].toString();

    let id;
    const item = await this.itemsRepository.getItemsByPk((id = item_id));

    if (!item) {
      throw new Error("해당하는 상품이 없습니다.");
    }

    const orderItem = await this.itemsRepository.getItemsByOrderItemPk(
      (id = order_item_id)
    );

    if (!orderItem) {
      throw new Error("해당하는 상품 발주가 없습니다.");
    }
    try {
      return await this.itemsRepository.orderStatusChange(order_item_id, state);
    } catch (error) {
      console.log(error);
      throw new Error("상품 상태 수정에 실패했습니다.");
    }
  };
}

module.exports = ItemsService;
