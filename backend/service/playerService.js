const playerData = require('../data/playerData')

exports.getPlayers = function () {
    return playerData.getPlayers();
}
exports.savePlayer = function (player) {
    return playerData.savePlayer(player);
}
