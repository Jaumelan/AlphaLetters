const playerData = require('../infra/database')

exports.getPosts = function () {
    return database.query('SELECT * FROM alphazendinha.scores')
}