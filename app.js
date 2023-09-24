require('dotenv').config();

const Server = require('./models/server');
//const Game = require('./models/gameModel')

//``const game = new Game();
const server = new Server();

server.listen();


