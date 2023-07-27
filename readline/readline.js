const readline = require("readline");

class IO {
  getInput = () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let input = "";

    return new Promise((resolve) => {
      rl.question("삭제하시겠습니까? (예/아니오): ", (answer) => {
        if (answer.toLowerCase() === "예") {
          // 사용자가 '예'라고 대답한 경우에만 로직을 실행
          input = answer;
          console.log("데이터를 삭제합니다.");
        } else {
          console.log("삭제를 취소합니다.");
        }
        rl.close();
        resolve(input);
      });
    });
  };
}

module.exports = IO;
