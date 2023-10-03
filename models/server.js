const express = require("express");
const cors = require("cors");
const { log } = require("console");

const Player = require("./userModel");
const GameModel = require("./gameModel");
const PlayerModel = require("./playerModel");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const users = [];
const games = [];
const room = [];
const actualRoom = 1010101;
const actualRoomUsers = [];

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};
    this.middlewares();
    this.routes();

    this.socketsEvents();
  }
  middlewares() {
    this.app.use(cors());
  }
  routes() {}
  socketsEvents() {
    this.io.on("connection", (socket) => {
      socket.on("joinServer", (username) => {
        const user = {
          userName: username,
          userId: socket.id,
        };
        if (users.length < 4) {
          users.push(user);
          console.log("Joinser to server");
          console.log(users);
        }
      });

      socket.on("joinPublicRoom", () => {
        socket.join(actualRoom.toString());
        //socket.emit("joined", "1234");
        socket.to(actualRoom.toString).emit("joined", actualRoom.toString());
        this.io.to(actualRoom.toString()).emit("joined", {
          players: users,
          roomName: actualRoom.toString(),
        });
        if (users.length >= 4) {
          const gameModel = new GameModel(0, actualRoom.toString());
          users.map((x) => gameModel.newPlayer(x.userName, x.userId));
          //console.log(gameModel.toJson());
          console.log(gameModel);
          this.io.to(actualRoom.toString()).emit("startGame", { gameModel });
        }
        //this.io.to("room1").emit({ users });
      });
      socket.on("disconnect", () => {
        //users.remove()
        console.log("Usuario Desconectado", socket.id);
      });
    });

    this.io.on("disconnection", (socket) => {
      console.log("user disconnected");
    });
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
