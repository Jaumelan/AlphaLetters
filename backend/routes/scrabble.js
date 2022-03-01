const express = require('express');
const router = express.Router();
const scrabbleRules = require("../components/scrabbleRules");
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
    scrabblePortugues.resetVariables();
    res.sendStatus(200);
})

module.exports = router;
