const playerData = require('../infra/database')

exports.getPlayers = function () {
    return playerData.getplayers();
}
exports.savePlayer = function (player) {
    return playerData.saveplayer(player);
}
