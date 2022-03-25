import { submitedLetters, receivedData, newBoard, boardRecord, firstMove, firstPlayerTurn, userSession, tilesPlayer1, tilesPlayer2, passTurnCounter } from "./constants.js";
import { boardCreator } from "./boardCreator.js";
import { showRecord } from "./getScore.js";

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
  
  export function resetButtons() {
    $("#playButton1").text("JOGAR");
    $("#playButton1").removeClass().addClass("gameButton");
    $("#player1-score").text("0");
    $("#playButton2").text("ESPERAR");
    $("#playButton2").removeClass().addClass("gameButtonEnd");
      $("#player2-score").text("0");
};

export function restartGame() {
    tilesPlayer1.forEach((tile) => {
        $(`#${tile.id}`).remove();
    });
    tilesPlayer2.forEach((tile) => {
        $(`#${tile.id}`).remove();
    });
    resetVariables();
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
            newBoard[i][j] = "";
        }
    }

    for (let i = 0; i < tilesPlayer1.length; i++) {
        tilesPlayer1[i].letter = "";
        tilesPlayer1[i].value = 0;
        tilesPlayer2[i].letter = "";
        tilesPlayer2[i].value = 0;
    }
    passTurnCounter.is = 0;
    boardRecord.length = 0;
    firstMove.is = false;
    firstPlayerTurn.is = true;
    $("#gameboard").html("");
    $(".meanings-box").html("");
    $(".score").html("0");
    $("#playButton1").removeClass().addClass("gameButton");
    $("#playButton1").html("JOGAR");
    $("#playButton2").removeClass().addClass("gameButtonWait");
    $("#playButton2").html("ESPERAR");
    boardCreator();

    //delete players names
    showRecord(117);
    let url = "http://45.77.102.28:3000/scrabble/reset/";
    $.get(url + userSession.is, function () {
        console.log("reset");
    }).done((ans) => console.log(ans));
}