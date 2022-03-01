import {submitedLetters } from "./constants.js";
import {tripleWord, doubleWord,tripleLetter, doubleLetter } from "./constants.js";
import { firstPlayerTurn } from "./constants.js";

export function boardCreator() {
  for (let i = 0; i < 15; i++) {
    let newRow = $('<div class="row"></div>');
    for (let j = 0; j < 15; j++) {
      let newCell = $('<div class="cell"></div>');
      newCell.attr("row-number", i);
      newCell.attr("column-number", j);
      newCell.attr("x", `${i}`);
      newCell.attr("y", `${j}`);
      newCell.attr("id", `${i}${j}`);
      newCell.addClass("droppable");
      // Helpful info: https://api.jqueryui.com/droppable/#event-out
      $(".droppable").droppable({
        drop: function (event, ui) {
          let draggedID = ui.draggable.attr("id");
          let draggedLetter = ui.draggable.attr("letter");
          let droppedPositionX = $(this).attr("x");
          let droppedPositionY = $(this).attr("y");
          /* let iddropito = $(this).attr("id");
          console.log(iddropito); */

          wordDraftCreator(
            draggedID,
            draggedLetter,
            droppedPositionX,
            droppedPositionY,
            firstPlayerTurn.is
          );
        },
        out: function (event, ui) {
          let draggedID = ui.draggable.attr("id");

          let droppedPosition = $(this).attr("xy");
          takeWordFromDraft(draggedID, firstPlayerTurn.is);
          //create a function to handle moving another one by mistake
        },
      });

      newRow.append(newCell);
      tripleWord.forEach((xy) => {
        if (xy[0] === i && xy[1] === j) {
          newCell.addClass("tripleWord");
          newCell.html("TP");
        }
      });
      doubleWord.forEach((xy) => {
        if (xy[0] === i && xy[1] === j) {
          newCell.addClass("doubleWord");
          newCell.html("DP");
        }
      });
      tripleLetter.forEach((xy) => {
        if (xy[0] === i && xy[1] === j) {
          newCell.addClass("tripleLetter");
          newCell.html("TL");
        }
      });

      doubleLetter.forEach((xy) => {
        if (xy[0] === i && xy[1] === j) {
          newCell.addClass("doubleLetter");
          newCell.html("DL");
        }
      });
    }
    $("#gameboard").append(newRow);
  }
}

export function wordDraftCreator(id, letter, positionx, positiony, player) {
  if (player) {
    submitedLetters[0].player1.push(letter);
    submitedLetters[0].playerId.push(id);
    submitedLetters[2].boardId.push({ positionx, positiony });
  } else {
    submitedLetters[1].player2.push(letter);
    submitedLetters[1].playerId.push(id);
    submitedLetters[2].boardId.push({ positionx, positiony });
  }
}
export function takeWordFromDraft(id, player) {
  if (player) {
    let index = submitedLetters[0].playerId.indexOf(id);
    if (index > -1) {
      submitedLetters[0].player1.splice(index, 1);
      submitedLetters[0].playerId.splice(index, 1);
      submitedLetters[2].boardId.splice(index, 1);
    }
  } else {
    let index = submitedLetters[1].playerId.indexOf(id);
    if (index > -1) {
      submitedLetters[1].player2.splice(index, 1);
      submitedLetters[1].playerId.splice(index, 1);
      submitedLetters[2].boardId.splice(index, 1);
    }
  }
}
