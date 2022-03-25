const express = require('express');
const router = express.Router();
const scrabbleRules = require("../components/scrabbleRules");
const playerService = require("../service/playerService");
const crypto = require("crypto");
const usersSessions = [];

//middlewares
router.use(express.json());
router.use(express.urlencoded({extended:true}));

//organizar aqui as rotas
router.get('/initialize', (req,res) => {

    let userSession = crypto.randomUUID();
    
    let user = { user: userSession, game: new scrabbleRules };
    usersSessions.push( user);
    console.log(usersSessions);
    // send idSession to front
    res.send(userSession);

})

//url + userSession.is + "/1/" + amount
.get('/drawletters/:userSession/:whichplayer/:amountOfLetters', (req, res) => {
    let data = req.params;
    console.log(data);
    /*let index = usersSessions.indexOf(userSession);
    console.log(index);*/
    const whichplayerOptions = ["1", "2"];
    const amountLettersOptions = ["0","1", "2", "3", "4", "5", "6", "7"];
    let exist = 0
    for (let i=0 ; i< usersSessions.length; i++) {
        if (usersSessions[i].user === data.userSession) {
            exist = 1;
            index = i
            console.log("user found");
        }
    }
     
    if (exist === 0) {
        res.status(400).json({message: "user not found"}); //Bad Request
        return;
    }

    if ( !whichplayerOptions.includes(data.whichplayer) ) {
        res.status(400).json({ message: "invalid player" }); // Bad Request
        return;
    };

    if ( !amountLettersOptions.includes(data.amountOfLetters) ) {
        res.status(400).json({ message: "invalid amount of letters" }); // Bad Request
        return;
    }
      
    res.send(usersSessions[index].game.drawLetters(data.whichplayer, data.amountOfLetters));

})
.get('/score', (req,res) => {
    let positions = JSON.parse(req.query.positions);
    let letters = req.query.letters;
    let user = req.query.user;

    let exist = 0
    for (let i=0 ; i< usersSessions.length; i++) {
        if (usersSessions[i].user === user) {
            exist = 1;
            index = i
            console.log("user found");
        }
    }
     
    if (exist === 0) {
        res.status(400).json({message: "user not found"}); //Bad Request
        return;
    }
    
    console.log("positions", positions, "letters ", letters);

    console.log("positions 0:", positions[0]);
    let answer = usersSessions[index].game.sendScore(letters,positions[0]);
    res.send(JSON.stringify(answer));
})
    .get('/reset/:userSession', (req, res) => {
    let data = req.params;
    console.log("reset: " + data);
    let exist = 0
        for (let i = 0; i < usersSessions.length; i++) {
            if (usersSessions[i].user === data.userSession) {
            exist = 1;
            index = i
            console.log("user found");
        }
    }
     
    if (exist === 0) {
        res.status(400).json({message: "user not found"}); //Bad Request
        return;
    }
    usersSessions[index].game.resetVariables();
    res.sendStatus(200);
})

.get('/players', async (req, res) => {
    const players = await playerService.getPlayers();
    console.log(players);
    res.json(players)
})

.post('/player',  async (req, res) => {
    const newPlayer = Object.values(req.body);
    newPlayer[1] = Number(newPlayer[1]);
    console.log(newPlayer)
    const newPlayerData = await playerService.savePlayer(newPlayer);
    console.log(newPlayerData)
})
module.exports = router;
