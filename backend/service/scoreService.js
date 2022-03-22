const playerData = require('../infra/database')

exports.getScores = function () {
    return scoreData.getScores();
}
exports.savePost = function (post) {
    return postData.savePost(post);
}
