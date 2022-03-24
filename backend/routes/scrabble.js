const express = require('express');
const router = express.Router();
const scrabbleRules = require("../components/scrabbleRules");
const playerService = require("../service/playerService");
const crypto = require("crypto");
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
