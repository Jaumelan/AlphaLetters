const database = require('../infra/database');

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
    try {
        const client = await database.connect();
        await client.query("INSERT INTO game.players (name, score, avatar_id) VALUES ($1,$2, $3);", player);
        await client.query("INSERT INTO game.players (name, score, avatar_id) VALUES ($1,$2, $3);", player);
        res.status(201).send('OK ' );
        client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
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