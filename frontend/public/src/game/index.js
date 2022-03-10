//declare the positions where the player gets bonuses
import { boardCreator } from "./boardCreator.js";
import { resetVariables } from "./resetVariables.js";
import { pushLettersToNewBoard, verifyWordsOnBoard } from "./newBoard.js";
import { validateTheMove, isNextToATile } from "./validateMove.js";
import { findDirection } from "./findDirection.js";
import {
  submitedLetters,
  receivedData,
  firstPlayerTurn,
  nicknames,
  tilesPlayer1,
  tilesPlayer2,
  classesNaoPermitidas,
  boardRecord,
  droppedID,
} from "./constants.js";

import { showRecord, endGameByPass } from "./getScore.js";

import {
  lettersToPlayersDeck,
  removeFromDeck,
  returnTilestoPlayersDeck,
  turnDraggable
} from "./deck.js";
import {
  pushLetters,
  rearrangeRowbyColumn,
  rearrangeColumnbyRow,
  drawFirstTiles,
} from "./player.js";
import { requestScores, changePlayer } from "./getScore.js";
let passTurnCounter = 0;

$("#homeButton").on("click", () => {
  $("#style").attr("href", "css/game.css");
});

$(document).ready(function () {
  let allowedWord = false;
  let firstMove = false;

  //function to display which players turn is
  function changeDisplayTurn() {
    if (firstPlayerTurn.is) {
      $("#playButton1").text("");
      $("#playButton1").text(`Jogar Jogador ${nicknames.player1}`);
    } else {
      $("#playButton").text("");
      $("#playButton2").text(`Jogar Jogador ${nicknames.player2}`);
    }
  }

  //function to check if is allowed word
  async function wordChecker(word) {
    /* let isAllowed = $("#word").val(); */
    let wordCheck = $.ajax({
      url: `https://significado.herokuapp.com/${word}`,
      statusCode: { 400: () => {
        returnTilestoPlayersDeck(firstPlayerTurn.is);
        changePlayer();
      } },
    });
    wordCheck.done((data) => {
      console.log(data);
      if (
        !classesNaoPermitidas.includes(data[0].class) &&
        data[0].meanings.length > 0
      ) {
        allowedWord = true;
        console.log("check word");
        pushLetters(firstPlayerTurn.is);
        removeFromDeck();
        requestScores();
      } else {
        returnTilestoPlayersDeck(firstPlayerTurn.is);
        changePlayer()
  
      }

      //colocar o significado
      if (allowedWord) {
        if (firstPlayerTurn.is) {
          $("#meaningPlayer1").html("");
          for (let i = 0; i <= data[0].meanings.length; i++) {
            let p = $("<p></p>");
            p.text(data[0].meanings[i].toUpperCase());
            $("#meaningPlayer1").append(p);
          }
        } else {
          $("#meaningPlayer2").html("");
          for (let i = 0; i <= data[0].meanings.length; i++) {
            let p = $("<p></p>");
            p.text(data[0].meanings[i].toUpperCase());
            $("#meaningPlayer2").append(p);
          }
        }
      }

      console.log(allowedWord);
      return allowedWord;
    });
  }

  boardCreator();
  drawFirstTiles();

  //event listeners

  $("#playButton1").on("click", function () {
    const url = "http://localhost:3000/scrabble/drawletters/";
    let amount = 0;
    let remaining = 120;
    let display1 = $("#playButton1").text();
    
    if (display1 === "Jogar") {
      //first check if his turn
      if (firstPlayerTurn.is) {
        //check if there are 7 letters on deck
        console.log("first player");
        tilesPlayer1.forEach((tile) => {
          if (tile.letter === "") {
            amount++;
          }
        });
        console.log(amount)
        if (amount > 0) {
          $.get(url + "1/" + amount, function (data) {
            console.log("player 1 new data: ", data);
            receivedData[0].letters.push(data.letters);
            receivedData[0].values.push(data.values);
            receivedData[0].whichPlayer = "player1";
            remaining = data.lettersLeft;
            showRecord(remaining);
            let { letters, values, whichPlayer } = { ...receivedData[0] };
            $("#deck0").empty();
            lettersToPlayersDeck(letters, values, whichPlayer);
          });
        }
      }
      //put draggable on player1's pieces
      /* console.log("vez ", firstPlayerTurn.is)*/
      turnDraggable(firstPlayerTurn.is);
      changeDisplay();
    } else if (display1 === "Finalizar") {
      //do all the validations
      endPlayersTurn();
      changeDisplay();
    } else if (display1 === "Espere") {
      alert("Vez do outro jogador");
    }

  });

  function changeDisplay() {
    const displayValues = ["Jogar", "Finalizar", "Espere"];
    let display1 = $("#playButton1").text();
    let display2 = $("#playButton2").text();

    if (firstPlayerTurn.is) {
      if (display1 === displayValues[0]) {
        $("#playButton1").text("");
        $("#playButton1").text(displayValues[1]);
        $("#playButton1").removeClass("gameButton").addClass("gameButtonEnd");
      } else if (display1 === displayValues[1]) {
        $("#playButton1").text("");
        $("#playButton1").text(displayValues[2]);
        $("#playButton1").removeClass("gameButtonEnd").addClass("gameButtonWait");
        $("#playButton2").text("");
        $("#playButton2").text(displayValues[0]);
        $("#playButton2").removeClass().addClass("gameButton");
      }
    } else {
      if (display2 === displayValues[0]) {
        $("#playButton2").text("");
        $("#playButton2").text(displayValues[1]);
        $("#playButton2").removeClass("gameButton").addClass("gameButtonEnd");
      } else if (display2 === displayValues[1]) {
        $("#playButton2").text("");
        $("#playButton2").text(displayValues[2]);
        $("#playButton2").removeClass("gameButtonEnd").addClass("gameButtonWait");
        $("#playButton1").text("");
        $("#playButton1").text(displayValues[0]);
        $("#playButton1").removeClass().addClass("gameButton");
      }
    }
  }

  $("#playButton2").on("click", function () {
    const url = "http://localhost:3000/scrabble/drawletters/";
    let display2 = $("#playButton2").text();
    let amount = 0;
    let remaining = 120;
    console.log(display2);
    if (display2 === "Jogar") {
      //first check if his turn
      if (!firstPlayerTurn.is) {
        //check if there are 7 letters on deck
        console.log("Second player");
        tilesPlayer2.forEach((tile) => {
          if (tile.letter === "") {
            amount++;
          }
        });
        console.log(amount);
        if (amount > 0) {
          $.get(url + "2/" + amount, function (data) {
            console.log("player 2 new data :", data);
            receivedData[1].letters.push(data.letters);
            receivedData[1].values.push(data.values);
            receivedData[1].whichPlayer = "player2";
            receivedData[2].lettersleft = data.lettersLeft;
            remaining = data.lettersLeft;
            showRecord(remaining);
            let { letters, values, whichPlayer } = { ...receivedData[1] };
            $("#deck1").empty();
            lettersToPlayersDeck(letters, values, whichPlayer);
          });
        }
      }
      //put draggable on player2's pieces
      /* console.log("vez ", firstPlayerTurn.is) */
      turnDraggable(firstPlayerTurn.is);
      changeDisplay();
    } else if (display2 === "Finalizar") {
      //do all the validations
      endPlayersTurn()
      changeDisplay()
    } else if (display2 === "Espere") {
      alert("Vez do outro jogador");
    }

    
  });

  //1. Função para começar o jogo: Depois de ter criado o avatar e ter apertado algum botão.
  //A função realiza dois fetchs, um para cada jogador, recebe as letras e as coloca no deck do jogador
  /* $("#requestButton").click(function requestFirstLetters() {
    const url = "http://localhost:3000/scrabble/drawletters/";
    
      if (firstPlayerTurn.is) {
        console.log("first player");
        tilesPlayer1.forEach(tile => {
          if (tile.letter === "") {
            amount++
          }
        });
        if (amount > 0) {
          $.get( url.drawletters  url + "1/" + amount, function (data) {
            console.log("player 1 new data: ", data);
            receivedData[0].letters.push(data.letters);
            receivedData[0].values.push(data.values);
            receivedData[0].whichPlayer = "player1";
            remaining = data.lettersLeft;
            showRecord(remaining);
            let { letters, values, whichPlayer } = { ...receivedData[0] };
            $("#deck0").empty();
            lettersToPlayersDeck(letters, values, whichPlayer);
          });
        }

      } else {
        console.log("Second player")
        tilesPlayer2.forEach(tile => {
          if (tile.letter === "") {
            amount++
          }
        });
        if (amount > 0) {
          $.get( url.drawletters  url + "2/" + amount, function (data) {
            console.log("player 2 new data :", data)
            receivedData[1].letters.push(data.letters);
            receivedData[1].values.push(data.values);
            receivedData[1].whichPlayer = "player2";
            receivedData[2].lettersleft = data.lettersLeft;
            remaining = data.lettersLeft;
            showRecord(remaining);
            let { letters, values, whichPlayer } = { ...receivedData[1] };
            $("#deck1").empty();
            lettersToPlayersDeck(letters, values, whichPlayer);
          });
        }
      }
    //}
    
   
  }); */

  $("#resetGame").on("click", function () {
    tilesPlayer1.forEach((tile) => {
      $(`#${tile.id}`).remove();
    });
    tilesPlayer2.forEach((tile) => {
      $(`#${tile.id}`).remove();
    });
    resetVariables();
    boardRecord.length = 0;
    firstMove = false;
    firstPlayerTurn.is = true;
    $("#gameboard").html("");
    boardCreator();
    //delete players names
    showRecord(117);
    $.get("http://localhost:3000/scrabble/reset", function () {
      console.log("reset");
    }).done((ans) => console.log(ans));
    /* $(".modal-avatar").css("display","flex"); */
  });

  //function to handle turn, and let player drag tiles to the board
  //the tile will only be draggable when it's player's turn
  //check here for references https://jqueryui.com/draggable/
  /* $("#playButton").on("click", function turnDraggable(player) {
    tilesPlayer1.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true }, { revert: "invalid" })
    );
    tilesPlayer2.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true }, { revert: "invalid" })
    );
    if (player) {
      tilesPlayer1.forEach((tile) =>
        $(`#${tile.id}`).draggable("option", "disabled", false)
      );
    } else {
      tilesPlayer2.forEach((tile) =>
        $(`#${tile.id}`).draggable("option", "disabled", false)
      );
    }
  }); */

  /* function turnDraggable(player) {
    tilesPlayer1.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true }, { revert: "invalid" })
    );
    tilesPlayer2.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true }, { revert: "invalid" })
    );
    if (player) {
      console.log("draggable player 1");
      tilesPlayer1.forEach((tile) =>
      {
        $(`#${tile.id}`).draggable("option", "disabled", false)}
      );
    } else {
      console.log("draggable player 2");
      tilesPlayer2.forEach((tile) =>
        $(`#${tile.id}`).draggable("option", "disabled", false)
      );
    }
  } */

  /* //event listeners
  $("#endTurn").on("click", function () {
    let draft;
    let submittedDirection;
    let gaps;
    let word;
    //player 1 validations
    if (firstPlayerTurn.is) {
      if (submitedLetters[0].player1.length > 0) {
        submittedDirection = findDirection(submitedLetters[2].boardId);
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
          //validation of player's move
          console.log(
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          );
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
            console.log(pos);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
            console.log(pos);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        }
      } else {
        console.log("player1 didn't play any tile");
      }
      //player 2 validations
    } else {
      submittedDirection = findDirection(submitedLetters[2].boardId);
      if (submitedLetters[1].player2.length > 1) {
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        }
      } else if (submitedLetters[1].player2.length === 1) {
        if (isNextToATile(submitedLetters[2].boardId)) {
          console.log("validei");
          pushLettersToNewBoard(firstPlayerTurn.is);
          draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
          let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
          console.log(pos);
          draft.forEach((array) => {
            word = array.join("");
            word = word.toLowerCase();
            console.log(word);
            wordChecker(word);
          });
        }
      } else {
        console.log("Player2 hasn't placed a tile");
      }
    }

    if (!firstMove) {
      firstMove = true;
    }
    if (allowedWord) {
      passTurnCounter = 0;
    } else {
      console.log("tentei mudar pass");
      passTurnCounter++;

      if (passTurnCounter === 4) {
        endGameByPass();
      }
    }

    allowedWord = false;
  }); */

  function endPlayersTurn() {
    let draft;
    let submittedDirection;
    let gaps;
    let word;
    //player 1 validations
    if (firstPlayerTurn.is) {
      if (submitedLetters[0].player1.length > 0) {
        submittedDirection = findDirection(submitedLetters[2].boardId);
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
          //validation of player's move
          console.log(
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          );
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
            console.log(pos);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
            console.log(pos);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        }
      } else {
        console.log("player1 didn't play any tile");
      }
      //player 2 validations
    } else {
      submittedDirection = findDirection(submitedLetters[2].boardId);
      if (submitedLetters[1].player2.length > 1) {
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (
            validateTheMove(
              submitedLetters[2].boardId,
              firstMove,
              submittedDirection
            )
          ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            draft.forEach((array) => {
              word = array.join("");
              word = word.toLowerCase();
              console.log(word);
              wordChecker(word);
            });
          }
        }
      } else if (submitedLetters[1].player2.length === 1) {
        if (isNextToATile(submitedLetters[2].boardId)) {
          console.log("validei");
          pushLettersToNewBoard(firstPlayerTurn.is);
          draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
          let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
          console.log(pos);
          draft.forEach((array) => {
            word = array.join("");
            word = word.toLowerCase();
            console.log(word);
            wordChecker(word);
          });
        }
      } else {
        console.log("Player2 hasn't placed a tile");
      }
    }

    if (!firstMove) {
      firstMove = true;
    }
    if (allowedWord) {
      passTurnCounter = 0;
    } else {
      console.log("tentei mudar pass");
      passTurnCounter++;

      if (passTurnCounter === 4) {
        endGameByPass();
      }
    }
    allowedWord = false;
  }

  // JS modal avatar

  const num = $(".ui-card").length;
  const even = num / 2;
  const odd = (num + 1) / 2;

  if (num % 2 == 0) {
    $(".ui-card:nth-child(" + even + ")").addClass("active");
    $(".ui-card:nth-child(" + even + ")")
      .prev()
      .addClass("prev");
    $(".ui-card:nth-child(" + even + ")")
      .next()
      .addClass("next");
  } else {
    $(".ui-card:nth-child(" + odd + ")").addClass("active");
    $(".ui-card:nth-child(" + odd + ")")
      .prev()
      .addClass("prev");
    $(".ui-card:nth-child(" + odd + ")")
      .next()
      .addClass("next");
  }

  $(".ui-card").click(function () {
    let slide = $(".active").width();
    if ($(this).hasClass("next")) {
      $(".container")
        .stop(false, true)
        .animate({ left: "-=" + slide });
    } else if ($(this).hasClass("prev")) {
      $(".container")
        .stop(false, true)
        .animate({ left: "+=" + slide });
    }

    $(this).removeClass("prev next");
    $(this).siblings().removeClass("prev active next");

    $(this).addClass("active");
    $(this).prev().addClass("prev");
    $(this).next().addClass("next");
  });

  // Keyboard nav
  $("#modalAvatar").on("keydown", function (e) {
    if (e.keyCode == 37) {
      // left
      $(".active").prev().trigger("click");
    } else if (e.keyCode == 39) {
      // right
      $(".active").next().trigger("click");
    }
  });

  function playAudio(audioName, extension) {
    const audio = document.createElement("audio");
    audio.src = `../sounds/${audioName}.${extension}`;
    audio.play();
  }
  $(".ui-card").on("click", function () {
    playAudio("transition", "wav");
  });

  $("#btn-choose").on("click", function () {
    $("#player-one .avatar-id").val(`${$(".active .avatar").attr("id")}`);
    $(".active").append(`<p>${$("#player-one .player-name").val()}</p>`);
    playAudio($("#player-one .avatar-id").val(), "mp3");
    $("#player-one").css("display", "none");
    $("#player-two").css("display", "inline");
    $("#headingPlayer").html("AVATAR DO SEGUNDO JOGADOR");
  });

  $("#btn-start").on("click", function () {
    $("#player-two .avatar-id").val(`${$(".active .avatar").attr("id")}`);
    playAudio($("#player-two .avatar-id").val(), "mp3");
    const players = [
      {
        name: $("#player-one .player-name").val(),
        avatar_id: $("#player-one .avatar-id").val(),
      },
      {
        name: $("#player-two .player-name").val(),
        avatar_id: $("#player-two .avatar-id").val(),
      },
    ];

    $("#player1-name").html(`${players[0].name}`);
    $("#avatarHolder1 img").attr("src", `images/avatar/${players[0].avatar_id}.png`);
    $("#deck0-player").html(`deck do ${players[0].name}`);
    $("#player2-name").html(`${players[1].name}`);
    $("#avatarHolder2 img").attr("src", `images/avatar/${players[1].avatar_id}.png`);
    $("#deck1-player").html(`deck do ${players[1].name}`);
    $(".modal-avatar").css("display", "none");
    $("#modal-tutorial").css("display", "flex");
    $("#modal-tutorial-step-one, #modal-tutorial-step-one *").css(
      "display",
      "flex"
    );
  });

  $("#btn-tutorial-step-one").on("click", function () {
    $("#modal-tutorial-step-one, #modal-tutorial-step-one *").css(
      "display",
      "none"
    );
    $("#modal-tutorial-step-two, #modal-tutorial-step-two *").css(
      "display",
      "flex"
    );
  });
  $("#btn-tutorial-step-two").on("click", function () {
    $("#modal-tutorial-step-two, #modal-tutorial-step-two *").css(
      "display",
      "none"
    );
    $("#modal-tutorial-step-three, #modal-tutorial-step-three *").css(
      "display",
      "flex"
    );
  });
  $("#btn-tutorial-step-three").on("click", function () {
    $("#modal-tutorial-step-three, #modal-tutorial-step-three *").css(
      "display",
      "none"
    );
    $("#modal-tutorial-step-four, #modal-tutorial-step-four *").css(
      "display",
      "flex"
    );
  });
  $("#btn-tutorial-step-four").on("click", function () {
    $("#modal-tutorial-step-four, #modal-tutorial-step-four *").css(
      "display",
      "none"
    );
    $("#modal-tutorial").css("display", "none");
  });
});
