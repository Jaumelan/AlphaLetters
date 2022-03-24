const express = require('express');
const router = express.Router();
const scrabbleRules = require("../components/scrabbleRules");
const playerService = require("../service/playerService")
/* const scrabblePortugues = new scrabbleRules; */
const usersSessions = [];
/*{name1: new ScrabbleRules}, {name2: new scrabbleRules} */
//middlewares
router.use(express.json());
router.use(express.urlencoded({extended:true}));

//more information https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//organizar aqui as rotas
router.get('/initialize', (req,res) => {

    let name = makeid(7);
    usersSessions.push( {name : new scrabbleRules});
    console.log(usersSessions);
    // send idSession to front
    res.send(name);

})
.get('/drawletters/:whichplayer/:amountOfLetters', (req, res) => {
    let data = req.params;
    console.log(data);
    const whichplayerOptions = ["1", "2"];
    const amountLettersOptions = ["0","1", "2", "3", "4", "5", "6", "7"];

    if ( !whichplayerOptions.includes(data.whichplayer) ) {
        res.status(400).json({ message: "invalid player" }); // Bad Request
        return;
    };

    if ( !amountLettersOptions.includes(data.amountOfLetters) ) {
        res.status(400).json({ message: "invalid amount of letters" }); // Bad Request
        return;
    }
//           usersSession[i].name      
    res.send(scrabblePortugues.drawLetters(data.whichplayer, data.amountOfLetters));

})
.get('/score', (req,res) => {
    let positions = JSON.parse(req.query.positions);
    let letters = req.query.letters;
    console.log("positions", positions, "letters ", letters);

    console.log("positions 0:", positions[0]);
    let answer = scrabblePortugues.sendScore(letters,positions[0]);
    res.send(JSON.stringify(answer));
})
.get('/reset', (req,res) => {
    console.log("reset");
    scrabblePortugues.resetVariables();
    res.sendStatus(200);
})

.get('/scores', async (req, res) => {
    const players = await playerService.getPlayers();
    res.json(players)
})

.post('/scores', async (req, res) => {
    let playersData = req.body;
    console.log(playersData);
    const newPlayer = await playerService.savePlayer(playersData);
    console.log(values);
})
module.exports = router;
