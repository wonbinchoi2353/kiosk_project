const OptionsService = require("../services/option.service");

class OptionsController {
  optionsService = new OptionsService();

  // 옵션 생성
  createOption = async (req, res) => {
    try {
      const { extra_price, shot_price, hot } = req.body;
      console.log(req.body);

      await this.optionsService.createOption(extra_price, shot_price, hot);

      res.status(201).json({ message: "옵션을 생성했습니다." });
    } catch (error) {
      console.log(error);
    }
  };

  //옵션 조회
  getOptions = async (_, res) => {
    try {
      const options = await this.optionsService.getOptions();

      res.status(200).json({ message: options });
    } catch (error) {
      console.log(error);
    }
  };

  //옵션 삭제
  deleteOptions = async (req, res) => {
    try {
      const { option_id } = req.params;

      await this.optionsService.deleteOptions(option_id);

      res.status(200).json({ message: "옵션을 삭제했습니다." });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = OptionsController;
