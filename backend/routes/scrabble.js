const express = require('express');
const router = express.Router();
const scrabbleRules = require("../components/scrabbleRules");
const playerService = require("../service/playerService")
const scrabblePortugues = new scrabbleRules;
//middlewares
router.use(express.json());
router.use(express.urlencoded({extended:true}));

//organizar aqui as rotas
router.get('/initialize', (req,res) => {
        
    res.send(scrabblePortugues.chooseLetters())
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
    const newPlayer = Object.values(req.body);
    newPlayer[1] = Number(newPlayer[1]);
    console.log(newPlayer)
    const newPlayerData = await playerService.savePlayer(playerData);
    console.log(newPlayerData)
})
module.exports = router;
