//declare the positions where the player gets bonuses
const apiURL = '45.77.102.28'
import { boardCreator } from "./boardCreator.js";
import { resetVariables, resetButtons, restartGame } from "./resetVariables.js";
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
  firstMove,
  noTiles,
  newBoard,
    userSession,
    passTurnCounter
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

$("#homeButton").on("click", () => {
  $("#style").attr("href", "css/game.css");
});

$(document).ready(function () {
    let allowedWord = false;

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
            statusCode: {
                400: () => {
                    console.log("code 400");
                    returnTilestoPlayersDeck(firstPlayerTurn.is);
                    changePlayer();
                }
            },
        });
        wordCheck.done((data) => {
            console.log("wordCheck data ", data);
            if (!classesNaoPermitidas.includes(data[0].class) && data[0].meanings.length > 0) {
                allowedWord = true;
                console.log("check word");

                pushLetters(firstPlayerTurn.is);
                requestScores();
                removeFromDeck();
                if (!firstMove.is) {
                    firstMove.is = true;
                    console.log("now second move")
                }
            } else {
                returnTilestoPlayersDeck(firstPlayerTurn.is);
                changePlayer()

            }

            //colocar o significado
            if (allowedWord) {
                if (firstPlayerTurn.is) {
                    $("#meaningPlayer1").html("");
                    for (let i = 0; i < data[0].meanings.length; i++) {
                        let p = $("<p></p>");
                        p.text(data[0].meanings[i].toUpperCase());
                        $("#meaningPlayer1").append(p);
                    }
                } else {
                    $("#meaningPlayer2").html("");
                    for (let i = 0; i < data[0].meanings.length; i++) {
                        let p = $("<p></p>");
                        p.text(data[0].meanings[i].toUpperCase());
                        $("#meaningPlayer2").append(p);
                    }
                }
            }

            return allowedWord;
        });
    }

    boardCreator();
    /* drawFirstTiles(); */

    //event listeners

    $("#playButton1").on("click", function () {
        const url = `http://${apiURL}:3000/scrabble/drawletters/`;
        let amount = 0;
        let remaining = 120;
        let display1 = $("#playButton1").text();
        console.log("display do botão ", display1);

        if (display1 === "JOGAR") {
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
                    $.get(url + userSession.is + "/1/" + amount , function (data) {
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
        } else if (display1 === "FINALIZAR") {
            //do all the validations
            console.log("vez de ", firstPlayerTurn.is)
            endPlayersTurn();
            changeDisplay();
            if (noTiles.is) {
                changePlayer();
                noTiles.is = false;
            }
        } else if (display1 === "ESPERAR") {
            alert("Vez do outro jogador");
        }

    });

    function changeDisplay() {
        const displayValues = ["JOGAR", "FINALIZAR", "ESPERAR"];
        let display1 = $("#playButton1").text();
        let display2 = $("#playButton2").text();
        console.log("change display do jogador ", firstPlayerTurn.is)

        if (firstPlayerTurn.is) {
            if (display1 === displayValues[0]) {
                console.log("changing display from ", displayValues[0]);
                $("#playButton1").text("");
                $("#playButton1").text(displayValues[1]);
                $("#playButton1").removeClass("gameButton").addClass("gameButtonEnd");
                $("#meaningPlayer2").html("");
            } else if (display1 === displayValues[1]) {
                console.log("changing display from ", displayValues[1]);
                $("#playButton1").text("");
                $("#playButton1").text(displayValues[2]);
                $("#playButton1").removeClass("gameButtonEnd").addClass("gameButtonWait");
                $("#playButton2").text("");
                $("#playButton2").text(displayValues[0]);
                $("#playButton2").removeClass().addClass("gameButton");
            }
        } else {
            if (display2 === displayValues[0]) {
                console.log("changing display from ", displayValues[0]);
                $("#playButton2").text("");
                $("#playButton2").text(displayValues[1]);
                $("#playButton2").removeClass("gameButton").addClass("gameButtonEnd");
                $("#meaningPlayer1").html("");
            } else if (display2 === displayValues[1]) {
                console.log("changing display from ", displayValues[1]);
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
        const url = `http://${apiURL}:3000/scrabble/drawletters/`;
        let display2 = $("#playButton2").text();
        let amount = 0;
        let remaining = 120;
        console.log(display2);
        if (display2 === "JOGAR") {
            //first check if his turn
            console.log("which player ", firstPlayerTurn.is);
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
                    $.get(url + userSession.is + "/2/" + amount , function (data) {
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
        } else if (display2 === "FINALIZAR") {
            //do all the validations
            endPlayersTurn()
            changeDisplay()
            if (noTiles.is) {
                changePlayer();
                noTiles.is = false;
            }
        } else if (display2 === "ESPERAR") {
            alert("Vez do outro jogador");
        }


    });

    $("#closeModal").on("click", function () {
        $("#modal-winner").css("display", "none");
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
        };

        for (let i = 0; i < tilesPlayer1.length; i++) {
            tilesPlayer1[i].letter = "";
            tilesPlayer1[i].value = 0;
            tilesPlayer2[i].letter = "";
            tilesPlayer2[i].value = 0;
        };
        passTurnCounter.is = 0;
        boardRecord.length = 0;
        firstMove.is = false;
        firstPlayerTurn.is = true;
        $("#gameboard").html("");
        boardCreator();
        resetButtons();
        //delete players names
        showRecord(117);
        let url = `http://${apiURL}:3000/scrabble/reset/`;
        $.get(url + userSession.is, function () {
            console.log("reset");
        }).done((ans) => console.log(ans));
        
    })
   
    $("#icons-restart").on("click", function () {

        restartGame();
        
    });
    $("#icons-home").on("click", function () {

        restartGame();
        location.reload();

    });

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
                    console.log(validateTheMove(submitedLetters[2].boardId, firstMove.is, submittedDirection));
                    if (validateTheMove(submitedLetters[2].boardId, firstMove.is, submittedDirection)) {
                        /* if() */
                        pushLettersToNewBoard(firstPlayerTurn.is);
                        draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
                        let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
                        console.log(pos);
                        draft.forEach((array) => {
                            word = array.join("");
                            word = word.toLowerCase();
                            console.log("fist player row ", word);
                            wordChecker(word);
                        });
                    }
                } else {
                    //sort letters by the row number
                    rearrangeColumnbyRow(firstPlayerTurn.is);
                    console.log(submitedLetters);
                    if (validateTheMove(submitedLetters[2].boardId,firstMove.is,submittedDirection)) {
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
                noTiles.is = true;
            }
            //player 2 validations
        } else {
            submittedDirection = findDirection(submitedLetters[2].boardId);
            if (submitedLetters[1].player2.length > 0) {
                if (submittedDirection === "row") {
                    //sort letters by the column number
                    rearrangeRowbyColumn(firstPlayerTurn.is);
                    console.log(submitedLetters);
                    if (
                        validateTheMove(
                            submitedLetters[2].boardId,
                            firstMove.is,
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
                            firstMove.is,
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
                noTiles.is = true;
            }
        }

        /* if (!firstMove.is) {
          firstMove.is = true;
          console.log()
        } */
        if (allowedWord) {
            passTurnCounter.is = 0;
        } else {
            console.log("tentei mudar pass");
            passTurnCounter.is++;

            if (passTurnCounter.is > 3) {

                endGameByPass();
            }
        }
        allowedWord = false;
    }
    //config-modal
    $("#icons-cog").on("click", function () {
        let display = $("#icons-config").css("display");
        console.log(display);
        if( display === "none") {
            $("#icons-config").css("display", "flex");
        } else {
           $("#icons-config").css("display", "none");
        };
        

    });

    $("#icons-leaderboard").click(function(){
        $("#modal-leaderboard").css("display", "flex");
        let rankingData;
        $.get(`http://${apiURL}:3000/scrabble/players`).done(data => rankingData = data);
        let ranking = rankingData.sort((a,b) => b.score - a.score);
        for (i = 0 ; i <=5; i++) {
            console.log(ranking[i].name + " " + ranking[i].score);
        }
        
    })

    $("#close-leaderboard").click(() => {

        $("#modal-leaderboard").css("display", "none");
    })

    //./images/buttons/pause.svg
    const soundtrack = new Audio("./sounds/starsbyanbrArtlist.mp3");
    $("#icons-play").click(() => {
        let options = ["./images/buttons/pause.svg", "./images/buttons/play.svg"];
        let source = $('#icons-play').attr("src");
        
        console.log(source);
        console.log(options[1]);
        if (source === options[1]) {
            soundtrack.play();
            $('#icons-play').attr("src", "./images/buttons/pause.svg")
        } else {
            soundtrack.pause();
            $('#icons-play').attr("src", "./images/buttons/play.svg");
        }
    })

    $("#icons-down").click(() => {
        
        soundtrack.volume -= 0.1;
       
    })

    $("#icons-up").click(() => {

        soundtrack.volume += 0.1;
    })

   /* soundtrack.addEventListener("canplaythrough", event => {
        *//* the audio is now playable; play it if permissions allow *//*
        soundtrack.play();
    });*/

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
            /*.animate({ left: "-=" + slide });*/
        } else if ($(this).hasClass("prev")) {
            $(".container")
                .stop(false, true)
            /*.animate({ left: "+=" + slide });*/
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

    function tutorialDragAndDrop() {

        $("#tutorial-piece").draggable();
        $("#tutorial-step-two-board").droppable({drop: function (event, ui) {
                $("#modal-tutorial-step-two, #modal-tutorial-step-two *").css(
                    "display",
                    "none"
                );
                $("#tutorial-step-two-board").droppable('destroy');
                $("#tutorial-piece").draggable('destroy');
                $("#modal-tutorial-step-three, #modal-tutorial-step-three *").css(
                        "display",
                        "flex"
                    );
                }
        });
    }
    

    tutorialDragAndDrop();

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
        /*playAudio($("#player-one .avatar-id").val(), "mp3");*/
        $("#player-one").css("display", "none");
        $("#player-two").css({"display": "flex", "flex-direction": "column"});
    $("#headingPlayer").html("AVATAR DO SEGUNDO JOGADOR");
  });

  $("#btn-start").on("click", function () {
    $("#player-two .avatar-id").val(`${$(".active .avatar").attr("id")}`);
    /*playAudio($("#player-two .avatar-id").val(), "mp3");*/
    const players = [
        {
        name: $("#player-one .player-name").val().toUpperCase(),
        avatar_id: $("#player-one .avatar-id").val(),
      },
      {
        name: $("#player-two .player-name").val().toUpperCase(),
        avatar_id: $("#player-two .avatar-id").val(),
      },
    ];

    $("#player1-name").html(`${players[0].name}`);
    $("#avatarHolder1 img").attr({src: `images/avatar/${players[0].avatar_id}.png`, name: `${players[0].avatar_id}`});
    $("#deck0-player").html(`deck do ${players[0].name}`);
    $("#player2-name").html(`${players[1].name}`);
    $("#avatarHolder2 img").attr({src: `images/avatar/${players[1].avatar_id}.png`, name: `${players[1].avatar_id}`});
    $("#deck1-player").html(`deck do ${players[1].name}`);
    $(".modal-avatar").css("display", "none");
    $("#modal-tutorial").css("display", "flex");
    $("#modal-tutorial-step-one, #modal-tutorial-step-one *").css(
      "display",
      "flex"
    );
      const initializeUrl = `http://${apiURL}:3000/scrabble/initialize/`;
    $.get(initializeUrl).done(data =>  console.log(data)).done(ans => {
        userSession.is = ans}).fail(error => console.log(error));
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
        $("#modal-tutorial-step-five, #modal-tutorial-step-five *").css(
            "display",
            "flex"
        );
    });

    $("#btn-tutorial-step-five").on("click", function () {
        $("#modal-tutorial-step-five, #modal-tutorial-step-five *").css(
      "display",
      "none"
    );
      $("#modal-tutorial").css("display", "none");
      $("#gameboard").css("display", "block");
  });
});
