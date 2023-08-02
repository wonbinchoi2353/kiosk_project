const ItemsRepository = require("../repositories/item.repository");
const IO = require("../readline/readline");
const { itemType } = require("../constants/constant");

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
    const item = await this.itemsRepository.getItemsByPk(item_id);

    if (!item) {
      throw new Error("해당하는 상품이 없습니다.");
    } else if (item.amount) {
      // 입력값을 받아 '예'를 반환하면 아이템 삭제
      const input = await this.io.getInput();
      if (input === "예") {
        await this.itemsRepository.deleteItem(item_id);
      } else {
        throw new Error("상품 삭제를 취소했습니다.");
      }
    } else {
      await this.itemsRepository.deleteItem(item_id);
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

    await this.itemsRepository.updateItem(item_id, name, price);
  };
}

module.exports = ItemsService;
