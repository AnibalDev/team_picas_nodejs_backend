const express = require('express');
const cors = require('cors');

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
    this.io.on('connection', socket => {
      console.log('Cliente connectado');
    })
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    }) 
  }

}

module.exports = Server;
