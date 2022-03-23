const database = require('../infra/database.js');

exports.getPlayers  = function () {
    database.connect()
    database.query(
        "SELECT TOP 10 * FROM game.players \
        ORDER BY score DESC")
    .then(result => result)
    .catch(e => console.error(e.stack))
    .then(() => database.end())
}
exports.savePlayer = function (player) {
    database.connect()
    database.query(
        "INSERT INTO game.players(name,score) \
        VALUES($1,$2,$3)", [player])
    .then(result => result)
    .catch(e => console.error(e.stack))
    .then(() => database.end())
}

/*
STENIO - 1
JAIME - 2
WELL  - 3
WASH  - 4
4
5
6
7
8
10

*/