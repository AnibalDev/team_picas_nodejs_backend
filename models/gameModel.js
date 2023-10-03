const CardModel = require("./cardModel");
const { Stack } = require("datastructures-js");
const PlayerModel = require("./playerModel");

class GameModel {
  constructor(actualPlayerIndex, roomName) {
    this.playersList = [];
    this.actualPlayerIndex = actualPlayerIndex;
    this.roomName = roomName;
    this.gameDeck = [];
    this.gameGraveyard = [];
    this.iniciarJuego();
  }

  newPlayer(name, id) {
    let mano = new Stack();
    for (let i = 0; i <= 8; i++) {
      mano.push(this.gameDeck.pop());
    }

    mano.toArray().sort((a, b) => a.value - b.value);
    console.log("Print Mano");
    console.log(mano);
    let p = new PlayerModel(name, id, mano);
    this.playersList.push(p);
    return p;
  }
  iniciarJuego() {
    const stack = this.generarCartas();
    this.gameDeck = stack;
  }
  barajar(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  generarCartas() {
    const array = [];
    for (let i = 1; i <= 13; i++) {
      for (let j = 0; j <= 3; j++) {
        // 0 = corazones, 1 = diamantes, 2 = trevoles, 3 = picas
        let type;
        let color;
        if (j === 0) {
          type = "c";
          color = "rojo";
        }
        if (j === 1) {
          type = "d";
          color = "rojo";
        }
        if (j === 2) {
          type = "t";
          color = "negro";
        }
        if (j === 3) {
          type = "p";
          color = "negro";
        }

        const card = new CardModel(type, i, i, color);

        array.push(card);
      }
    }
    return Stack.fromArray(this.barajar(array));
  }
}
module.exports = GameModel;
