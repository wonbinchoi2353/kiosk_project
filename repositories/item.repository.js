const { Item } = require("../models");

class ItemsRepository {
  postItem = async (name, price, type) => {
    const item = await Item.findOne({ where: { name } });

    if (!item) {
      await Item.create({ name, price, type });
      item.amount += 1;
      await item.save();
    } else {
      item.amount += 1;
      await item.save();
    }
  };

  getItems = async (type) => {
    if (type) {
      return await Item.findAll({ where: { type } });
    } else {
      return await Item.findAll();
    }
  };
}

module.exports = ItemsRepository;
