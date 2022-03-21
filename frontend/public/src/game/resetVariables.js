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
      
  };