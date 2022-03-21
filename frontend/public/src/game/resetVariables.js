 import { submitedLetters, receivedData, newBoard,tilesPlayer1, tilesPlayer2} from "./constants.js";
 export function resetVariables() {
    console.log("reset variables", submitedLetters);
    submitedLetters[0].player1 = [];
    submitedLetters[0].playerId = [];
    submitedLetters[1].player2 = [];
    submitedLetters[1].playerId = [];
    submitedLetters[2].boardId = [];

    receivedData[0].letters = [];
    receivedData[0].values = [];
    receivedData[1].letters = [];
    receivedData[1].values = [];
    receivedData[2];
  
    for(let i = 0 ; i<newBoard.length; i++) {
      for (let j = 0 ; j< newBoard[i].length; j++) {
        newBoard[i][j] = "";
      }
    }

    for (let i = 0 ; i<tilesPlayer1.length ; i ++ ){
      tilesPlayer1[i].letter = "";
      tilesPlayer1[i].value = 0;
      tilesPlayer2[i].letter = "";
      tilesPlayer2[i].value = 0;
    }
      
  };