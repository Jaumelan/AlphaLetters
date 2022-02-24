const board = [
  [ "3p", "1", "1", "2l", "1", "1", "1", "3p", "1", "1", "1", "2l", "1", "1", "3p", ],
  [ "1", "2p", "1", "1", "1", "3l", "1", "1", "1", "3l", "1", "1", "1", "2p", "1",  ],
  [ "1", "1", "2p", "1", "1", "1", "2l", "1", "2l", "1", "1", "1", "2p", "1", "1",  ],
  [ "2l", "1", "1", "2p", "1", "1", "1", "2l", "1", "1", "1", "2p", "1", "1", "2l", ],
  [  "1",  "1", "1", "1", "2p", "1", "1", "1", "1", "1", "2p", "1", "1", "1", "1",  ],
  [ "1", "3l", "1", "1", "1", "3l", "1", "1", "1", "3l", "1", "1", "1", "3l", "1",  ],
  [ "1", "1", "2l", "1", "1", "1", "2l", "1", "2l", "1", "1", "1", "2l", "1", "1", ],
  [ "3p", "1", "1", "2l", "1", "1", "1", "2p", "1", "1", "1", "2l", "1", "1", "3p",  ],
  [ "1", "1", "2l", "1", "1", "1", "2l", "1", "2l", "1", "1", "1", "2l", "1", "1",  ],
  [ "1", "3l", "1", "1", "1", "3l", "1", "1", "1", "3l", "1", "1", "1", "3l", "1",  ],
  [ "1", "1", "1",  "1", "2p", "1", "1", "1", "1",  "1", "2p", "1", "1", "1", "1",  ],
  [ "2l", "1", "1", "2p", "1", "1", "1", "2l", "1", "1", "1", "2p", "1", "1", "2l", ],
  [ "1", "1", "2p", "1", "1", "1", "2l", "1", "2l", "1", "1", "1", "2p", "1", "1",  ],
  [ "1", "2p", "1", "1", "1", "3l", "1", "1", "1", "3l", "1", "1", "1", "2p", "1",  ],
  [ "3p", "1", "1", "2l", "1", "1", "1", "3p", "1", "1", "1", "2l", "1", "1", "3p", ],
];

//Set the game for two players only

module.exports = class Scrabble {
  constructor() {
    this.letters = [ "A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Z", ];
    this.lettersCount = [ 14, 3, 4, 2, 5, 11, 2, 2, 2, 10, 2, 5, 6, 4, 10, 4, 1, 6, 8, 5, 7, 2, 1, 1, ];
    this.lettersValues = [ 1, 3, 2, 3, 2, 1, 4, 4, 4, 1, 5, 2, 1, 3, 1, 2, 6, 1, 1, 1, 1, 4, 8, 8, ];
    this.jokersNumber = 3;
    this.player1 = {
      score: 0,
      lettersReceived: [],
    };
    this.player2 = {
      score: 0,
      lettersReceived: [],
    };
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
    }

    if (index2 < index1) {
      player1Starts = false;
    }

    let sendLetters = {
      player1: this.letters[index1],
      player2: this.letters[index2],
      firstStarts: player1Starts,
    };
    return sendLetters;
  }

  //função para enviar as letras
  drawLetters(player, amountRequested) {
    let send = {
      letters: [],
      values: [],
      lettersLeft: 0,
    };
    let indexletter = [];
    let amountRemaining = this.lettersCount.reduce((x, y) => x + y);
    let piecesSentBack = 0;
    /* let counter = 0; */
    let indexesToDelete = [];

    //checar quais índices são 0
    for (let i=0; i <= this.lettersCount.length; i++) {
      if (this.lettersCount[i] === 0) {
        indexesToDelete.push(i);
      }
    }

    //primeiro ver se tem a quantidade requisitada, caso contrário entregar 
    //o máximo que pode 
    if (amountRequested <= amountRemaining) {
      piecesSentBack = amountRequested;
    } else {
      piecesSentBack = amountRemaining;
    }
    //gerar os índices das letras
    for (let i=0; i<piecesSentBack; i++) {
      let index = this.randomIndex();
      while (indexesToDelete.includes(index)) {
        index = this.randomIndex();
      }
      indexletter.push(index);
    };

    //pegar o índice e criar o array com as letras e tirar uma letra do contador
    indexletter.forEach(index=> {
      send.letters.push(this.letters[index]);
      send.values.push(this.lettersValues[index]);
      this.lettersCount[index] --
    });
    
    //atualizar as letras enviadas pro jogador
    if (player === 1) {
      this.player1.lettersReceived.push(send.letters);
    } else {
      this.player2.lettersReceived.push(send.letters);
    }
    send.lettersLeft = amountRemaining;

    return send;
  }

  //função para enviar a pontuação
  sendScore(letters_received, positions_received) {
    
    let letters_check = JSON.parse(letters_received);
    letters_check = letters_check[0];
    let positions_check = JSON.parse(positions_received);
    
    let score = 0;
    let values = [];
    let index;
    
    for(let i = 0; i<positions_check.length; i++) {
      index = this.letters.indexOf(letters_check[i]);
      let localValue ;
      
      if(board[positions_check[i].posx][positions_check[i].posy] === "2l") {
        localValue = this.lettersValues[index] * 2;
        values.push(localValue);
      } else if (board[positions_check[i].posx][positions_check[i].posy] === "3l") {
        localValue = this.lettersValues[index] * 3;
        values.push(localValue);
      } else {
        localValue = this.lettersValues[index];
        console.log(localValue);
        values.push(localValue);
      }
    };

    positions_check.forEach(item=>{
      if (board[item.posx][item.posy] === "2p") {
        values.map(value=> value*2);
      } else if( board[item.posx][item.posy] === "3p") {
        values.map(value=>value*3);
      }
    })
    score = values.reduce((i,value)=>i+value,0)

    return score;

  }
};
