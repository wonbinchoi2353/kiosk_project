const { Item, Option } = require("../models");

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
    // 매개변수
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
}

module.exports = ItemsRepository;
