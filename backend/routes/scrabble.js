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
.get('/shuffleletters/:whichplayer', (req, res) => {
    let player = req.params;
    console.log(player);
    res.send(scrabblePortugues.shuffleLetters(player));

})

module.exports = router;