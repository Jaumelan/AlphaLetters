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

module.exports = router;
