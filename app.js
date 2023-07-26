const express = require("express");
const itemsRouter = require("./routes/item.route");
const app = express();
const PORT = 3000;

class Server {
  constructor() {
    this.itemsRouter = itemsRouter;
  }
  openServer = (app, PORT) => {
    app.use(express.json());
    app.use("/api", [this.itemsRouter]);

    app.listen(PORT, () => {
      console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
    });
  };
}

const server = new Server();
server.openServer(app, PORT);
