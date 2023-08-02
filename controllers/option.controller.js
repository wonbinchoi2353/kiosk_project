const OptionsService = require("../services/option.service");

class OptionsController {
  optionsService = new OptionsService();

  createOption = async () => {
    await this.optionsService.createOption();
  };
}

module.exports = OptionsController;
