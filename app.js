const express = require("express");
const app = express();
const PORT = 3000;

class Server {
  openServer = (app, PORT) => {
    app.use("/", (_, res) => {
      res.send("hi");
    });

    app.listen(PORT, () => {
      console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
    });
  };
}

const server = new Server();
server.openServer(app, PORT);
