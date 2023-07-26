const { Item } = require("../models");

class ItemsRepository {
  postItem = async (name, price, type) => {
    const item = await Item.findOne({ where: { name } });
    console.log(item.amount);
    if (!item) {
      await Item.create({ name, price, type });
      item.amount += 1;
      await item.save();
    } else {
      item.amount += 1;
      await item.save();
    }
  };
}

module.exports = ItemsRepository;
