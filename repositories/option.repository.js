const { Option } = require("../models");

class OptionsRepository {
  // 옵션 생성
  createOption = async (extra_price, shot_price, hot) => {
    console.log(extra_price, shot_price, hot);
    await Option.create({ extra_price, shot_price, hot });
  };

  // 옵션 조회
  getOptions = async () => {
    return await Option.findAll();
  };

  // 옵션 삭제
  deleteOptions = async (id) => {
    await Option.destroy({ where: { id } });
  };
}

module.exports = OptionsRepository;
