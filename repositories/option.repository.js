const { Item, Option } = require("../models");

class OptionsRepository {
  createOption = async () => {
    await Option.create({});
  };
}

module.exports = OptionsRepository;
