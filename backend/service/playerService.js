const playerData = require('../data/playerData')

exports.getPlayers = function () {
    return playerData.getplayers();
}
exports.savePlayer = function (player) {
    return playerData.savePlayer(player);
}
