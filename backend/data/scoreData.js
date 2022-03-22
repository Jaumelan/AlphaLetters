const database = require('../infra/database');

exports.getScores = function () {
    database.connect()
    database.query("SELECT * FROM alphazendinha.scores")
    .then(result => result)
    .catch(e => console.error(e.stack))
    .then(() => database.end())
}