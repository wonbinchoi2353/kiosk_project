const OptionsRepository = require("../repositories/option.repository");

class OptionsService {
  optionsRepository = new OptionsRepository();

  // 옵션 생성
  createOption = async (extra_price, shot_price, hot) => {
    await this.optionsRepository.createOption(extra_price, shot_price, hot);
  };

  //옵션 조회
  getOptions = async () => {
    return await this.optionsRepository.getOptions();
  };

  //옵션 삭제
  deleteOptions = async (option_id) => {
    await this.optionsRepository.deleteOptions(option_id);
  };
}

module.exports = OptionsService;
