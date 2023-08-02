const OptionsRepository = require("../repositories/option.repository");

class OptionsService {
  optionsRepository = new OptionsRepository();

  createOption = async () => {
    await this.optionsRepository.createOption();
  };
}

module.exports = OptionsService;
