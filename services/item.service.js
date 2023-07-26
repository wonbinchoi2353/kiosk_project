const ItemsRepository = require("../repositories/item.repository");

const itemType = {
  COFFEE: "coffee",
  JUICE: "juice",
  FOOD: "food",
};

class ItemsService {
  itemsRepository = new ItemsRepository();

  postItem = async (name, price, type) => {
    // 이름, 가격이 없는 경우 {name}을 입력해주세요 -> {name}이 뭐죠?
    if (!name || !price) {
      throw new Error("이름과 가격이 없다!");
    }

    const itemTypeString = JSON.stringify(itemType);

    // 알맞은 타입을 지정해주세요
    if (!itemTypeString.includes(type)) {
      throw new Error("타입이 틀렸다!");
    }
    await this.itemsRepository.postItem(name, price, type);
  };
}

module.exports = ItemsService;
