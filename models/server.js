const express = require('express');
const cors = require('cors');
const { log } = require('console');

const Player = require('./userModel');
const users = [];
const games = [];
const room = [];



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {};
    this.middlewares();
    this.routes();
    
    this.socketsEvents();
  }
  middlewares() {
    this.app.use(cors());
  }
  routes() {

  }
  socketsEvents() {
    this.io.on('connection', (socket) => {
      const username = socket.handshake.query.username;

      users.push(new Player(socket.id, username));

      socket.on('joinGame', (data) => {
        socket.join('room1')
        this.io.to('room1').emit({users})
      }),
      socket.on("disconnect", () => {
        console.log('Usuario Desconectado',socket.id); 
      });
    })
    
    this.io.on('disconnection', (socket) => {
      console.log('user disconnected');
    })
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    }) 
  }
}

module.exports = Server;
