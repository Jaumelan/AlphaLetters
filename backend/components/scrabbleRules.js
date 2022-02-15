//criar aqui todas as funções do jogo
const board = [
    ["3p","1","1","2l","1","1","1","3p","1","1","1","2l","1","1","3p"],
    ["1","2p","1","1","1","3l","1","1","1","3l","1","1","1","2p","1"],
    ["1","1","2p","1","1","1","2l","1","2l","1","1","1","2p","1","1"],
    ["2l","1","1","2p","1","1","1","2l","1","1","1","2p","1","1","2l"],
    ["1","1","1","1","2p","1","1","1","1","1","2p","1","1","1","1"],
    ["1","3l","1","1","1","3l","1","1","1","3l","1","1","1","3l","1"],
    ["1","1","2l","1","1","1","2l","1","2l","1","1","1","2l","1","1"],
    ["3p","1","1","2l","1","1","1","1","1","1","1","2l","1","1","3p"],
    ["1","1","2l","1","1","1","2l","1","2l","1","1","1","2l","1","1"],
    ["1","3l","1","1","1","3l","1","1","1","3l","1","1","1","3l","1"],
    ["1","1","1","1","2p","1","1","1","1","1","2p","1","1","1","1"],
    ["2l","1","1","2p","1","1","1","2l","1","1","1","2p","1","1","2l"],
    ["1","1","2p","1","1","1","2l","1","2l","1","1","1","2p","1","1"],
    ["1","2p","1","1","1","3l","1","1","1","3l","1","1","1","2p","1"],
    ["3p","1","1","2l","1","1","1","3p","1","1","1","2l","1","1","3p"]
];

/* const letters = ['A','B','C','Ç','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X','Z'];
const lettersCount = [14,3,4,2,5,11,2,2,2,10,2,5,6,4,10,4,1,6,8,5,7,2,1,1];
const lettersValues = [1,3,2,3,2,1,4,4,4,1,5,2,1,3,1,2,6,1,1,1,1,4,8,8];
const jokersNumber = 3; */

//Set the game for two players only

module.exports = class Scrabble {
    constructor() {
        this.letters = ['A','B','C','Ç','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X','Z'];
        this.lettersCount = [14,3,4,2,5,11,2,2,2,10,2,5,6,4,10,4,1,6,8,5,7,2,1,1];
        this.lettersValues = [1,3,2,3,2,1,4,4,4,1,5,2,1,3,1,2,6,1,1,1,1,4,8,8];
        this.jokersNumber = 3;
        this.player1 = {
            score: 0,
            lettersReceived : []
        };
        this.player2 = {
            score: 0,
            lettersReceived : []
        }
    }

    randomIndex() {
        let min = Math.ceil(0);
        let max = Math.floor(23);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    chooseLetters() {
        let index1 = this.randomIndex();
        let index2 = this.randomIndex();
        let player1Starts = true;
    
        while (index1 === index2) {
            index2 = this.randomIndex();
        };
    
        if (index2 < index1) {
            player1Starts = false;
        }
    
        let sendLetters = {
            player1: this.letters[index1],
            player2: this.letters[index2],
            firstStarts: player1Starts
        };
        return sendLetters
    }

    drawFirst7Letters(player) {
        let sendLetters = [];
        let indexletter; 

        for(let i=0; i<7; i++) {
            indexletter = this.randomIndex();
            if(this.lettersCount[indexletter] !== 0) {
                while(sendLetters.length < 7)
                sendLetters.push(this.letters[indexletter]);
                this.lettersCount[indexletter] --
            } else {
                indexletter = this.randomIndex();
            }
        }

        if (player === 1) {
            this.player1.lettersReceived.push(sendLetters);
        } else {
            this.player2.lettersReceived.push(sendLetters);
        }       

        return sendLetters
    }
}

