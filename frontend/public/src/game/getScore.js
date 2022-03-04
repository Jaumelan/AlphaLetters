import { verifyWordsOnBoard, appendToBoard } from "./newBoard.js";
import { submitedLetters, firstPlayerTurn } from "./constants.js";
import { removeTiles } from "./deck.js";

export function endGameByPass() {
  $("#meaning").html("");
  let score1 = Number($("#player1-score").val());
  let score2 = Number($("#player2-score").val());
  let winner;

  if (score1>score2) {
    winner = $("#player1-name").text();
  } else if (score1 === score2) {
    winner = "Empate! se resolve no soco";
  } else {
    winner = $("#player2-name").text();
  }

  if (winner === "Empate!") {
    let p = $("<p></p>");
    p.text(`Parabéns! ${winner}`);
    $("#meaning").append(p);
  } else {
    let p = $("<p></p>");
    p.text(`O vencedor é ${winner}`);
    $("#meaning").append(p)
  }
  return true;
}

export function requestScores() {
    let positions = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
    positions = JSON.stringify(positions);
    let letters = JSON.stringify(verifyWordsOnBoard(submitedLetters[2].boardId, 1));
    console.log("pos ", positions, "letters ", letters);
    console.log("antes do score ",submitedLetters);
    $.get("http://localhost:3000/scrabble/score",{positions, letters})
    .done(answer => {
      let score = JSON.parse(answer)
      return score}).done(score => {
      let value;
      console.log("score ",score)
      
      if (firstPlayerTurn.is) {
        value = Number($("#player1-score").text()) + Number(score);   
        $("#player1-score").text("");
        $("#player1-score").text(value);
      } else {
        let a = Number($("#player2-score").text())
        console.log("a ",a);
        value = Number($("#player2-score").text()) + Number(score);
        $("#player2-score").text("");
        $("#player2-score").text(value);
      }
      
    }).done(()=> {
      //clonar o id clone()
      appendToBoard(firstPlayerTurn.is)
      removeTiles(firstPlayerTurn.is);
     
    }).done(()=>{
      /* resetVariables(); */
      changePlayer();
    })   
     
      return true
  };

export function changePlayer() {
    return (firstPlayerTurn.is = !firstPlayerTurn.is);
  }

export function showRecord(remaings) {
  $("#piecesRemaining").text("");
  $("#piecesRemaining").text(remaings);
}