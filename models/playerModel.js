class PlayerModel {

  constructor(playerName, playerId, playerHand) {
    this.playerGames = [];
    this.playerHand = playerHand;
    this.playerName = playerName;
    this.playerId = playerId;
  }
}

module.exports = PlayerModel;
