const database = require('../infra/database');
exports.getPlayers  = function () {
    return database.query('SELECT ${columns:name} FROM ${table:name}', {
        columns: ['*'],
        table: 'players'
    })
}
exports.savePlayer =  function (player) {
    try {
        return database.one("INSERT INTO game.players (name, score, avatar_id) VALUES ($1,$2, $3) returning *", player);
        } catch (err) {
            console.error(err);
        }
    }
    // database
    // .connect()
    // .then(() =>console.log('connected'))
    // .catch(err => console.error('connection error', err.stack))
    // .then(() => database.end())
    // database.query(
    //     "INSERT INTO game.players(name, score, avatar_id) \
    //     VALUES($1,$2,$3)", [name, score, avatar_id])
    //     .then(result => result)
    //     .catch(e => console.error(e.stack))
    //     .then(() => database.end())
    //     )
    // }
/*
DANUBIO - 1
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