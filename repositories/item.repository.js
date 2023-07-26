const { Item } = require("../models");

class ItemsRepository {
  postItem = async (name, price, type) => {
    await Item.create({ name, price, type });
  };
}

module.exports = ItemsRepository;
