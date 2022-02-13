const express = require('express');
const router = express.Router();
const scrabbleRules = require("../components/scrabbleRules");

//middlewares
router.use(express.json());

//organizar aqui as rotas
router.get('/initialize', (req,res) => {
    console.log(req);
    res.send("You are in get route")
})

module.exports = router;