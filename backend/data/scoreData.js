const database = require('../infra/database.js');

exports.getScores = function () {
    database.connect()
    database.query(
        "SELECT TOP 10 * FROM alphazendinha.scores \
        ORDER BY score DESC")
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