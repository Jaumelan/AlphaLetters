
//declare the positions where the player gets bonuses
import { boardCreator } from './boardCreator.js'
import { resetVariables } from './resetVariables.js'
import { pushLettersToNewBoard, verifyWordsOnBoard } from './newBoard.js'
import { validateTheMove, isNextToATile } from './validateMove.js'
import { findDirection } from './findDirection.js'
import {
  submitedLetters,
  receivedData,
  firstPlayerTurn,
  nicknames,
  tilesPlayer1,
  tilesPlayer2,
  classesNaoPermitidas,
  boardRecord,
  droppedID
} from './constants.js'

import { showRecord, endGameByPass } from './getScore.js'

import { lettersToPlayersDeck, removeFromDeck, returnTilestoPlayersDeck } from './deck.js'
import { pushLetters, rearrangeRowbyColumn, rearrangeColumnbyRow, drawFirstTiles } from "./player.js"
import { requestScores, changePlayer } from "./getScore.js"
let passTurnCounter = 0;

$("#homeButton").on("click", () => {
  $("#style").attr("href", "css/game.css")
});

$(document).ready(function () {
  let allowedWord = false
  let firstMove = false;
  
  //function to display which players turn is
  function changeDisplayTurn() {
    if (firstPlayerTurn.is) {
      $("#playButton").text("");
      $("#playButton").text(`Jogar Jogador ${nicknames.player1}`);
    } else {
      $("#playButton").text("");
      $("#playButton").text(`Jogar Jogador ${nicknames.player2}`);
    }
  }

  //function to check if is allowed word
  async function wordChecker(word) {
    /* let isAllowed = $("#word").val(); */
    let wordCheck = $.ajax({ url: `https://significado.herokuapp.com/${word}`, statusCode: { 400: () => returnTilestoPlayersDeck(firstPlayerTurn.is) }, });
    wordCheck.done((data) => {
      console.log(data)
      if (!classesNaoPermitidas.includes(data[0].class) && data[0].meanings.length > 0) {

        allowedWord = true;
        console.log("check word")
        pushLetters(firstPlayerTurn.is);
        removeFromDeck();
        requestScores();
      } else {
        returnTilestoPlayersDeck(firstPlayerTurn.is);
        changePlayer();

      }

      //colocar o significado
      if (allowedWord) {
          $("#meaning").html("");
          for (let i = 0; i <= data[0].meanings.length; i++) {
            let p = $("<p></p>");
            p.text(data[0].meanings[i]);
            $("#meaning").append(p);
          }
        }
      console.log(allowedWord);
      return allowedWord;
    });
  };

  boardCreator();
  drawFirstTiles();

  
  //Depois passar todas estas funções para um arquivo separado
  //1. Função para começar o jogo: Depois de ter criado o avatar e ter apertado algum botão.
  //A função realiza dois fetchs, um para cada jogador, recebe as letras e as coloca no deck do jogador
  $("#requestButton").click(function requestFirstLetters() {
    const url = "http://localhost:3000/scrabble/drawletters/";
    /* let amount = 0;
    let remaining;
    if (!firstMove) {
      //request the first 7 letters for player1
      $.get(/* url.drawletters  url + "1/7", function (data) {
        receivedData[0].letters.push(data.letters);
        receivedData[0].values.push(data.values);
        receivedData[0].whichPlayer = "player1";
        let { letters, values, whichPlayer } = { ...receivedData[0] };
        lettersToPlayersDeck(letters, values, whichPlayer);
      });
      //request the first 7 letters for player2
      $.get(/* url.drawletters  url + "2/7", function (data) {
        receivedData[1].letters.push(data.letters);
        receivedData[1].values.push(data.values);
        receivedData[1].whichPlayer = "player2";
        receivedData[2].lettersleft = data.lettersLeft;
        console.log(receivedData[2].lettersleft)
        remaining = data.lettersLeft;
        showRecord(remaining);
        let { letters, values, whichPlayer } = { ...receivedData[1] };
        lettersToPlayersDeck(letters, values, whichPlayer);
      });
    } else { */
      if (firstPlayerTurn.is) {
        console.log("first player");
        tilesPlayer1.forEach(tile => {
          if (tile.letter === "") {
            amount++
          }
        });
        if (amount > 0) {
          $.get(/* url.drawletters */ url + "1/" + amount, function (data) {
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
          $.get(/* url.drawletters */ url + "2/" + amount, function (data) {
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
    
   
  });

  $('#resetGame').on("click", function () {
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
    $.get("http://localhost:3000/scrabble/reset",function(){
      console.log("reset");
    }).done(ans => console.log(ans));
    /* $(".modal-avatar").css("display","flex"); */
  })

  //function to handle turn, and let player drag tiles to the board
  //the tile will only be draggable when it's player's turn
  //check here for references https://jqueryui.com/draggable/
  $("#playButton").on("click", function () {
    tilesPlayer1.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true }, { revert: "invalid" })
    );
    tilesPlayer2.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true }, { revert: "invalid" })
    );
    if (firstPlayerTurn.is) {
      tilesPlayer1.forEach((tile) =>
        $(`#${tile.id}`).draggable("option", "disabled", false)
      );
    } else {
      tilesPlayer2.forEach((tile) =>
        $(`#${tile.id}`).draggable("option", "disabled", false)
      );
    }
  });

  //event listeners
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
          console.log(validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection));
          if (validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection)) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2)
            console.log(pos);
            draft.forEach((array) => {
              word = array.join("");
              console.log(word);
              wordChecker(word)
            });
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection)) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2)
            console.log(pos);
            draft.forEach((array) => {
              word = array.join("");
              console.log(word);
              wordChecker(word);
            });
          }
        }
      } else {
        console.log("player didn't play any tile");
      }
      //player 2 validations
    } else {
      submittedDirection = findDirection(submitedLetters[2].boardId);
      if (submitedLetters[1].player2.length > 1) {
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection)) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            draft.forEach((array) => {
              word = array.join("");
              console.log(word);
              wordChecker(word);
            });
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if (validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection)) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
            draft.forEach((array) => {
              word = array.join("");
              console.log(word);
              wordChecker(word);
            });

          }
        }
      } else if (submitedLetters[1].player2.length === 1) {

        if (isNextToATile(submitedLetters[2].boardId)) {
          console.log("validei")
          pushLettersToNewBoard(firstPlayerTurn.is);
          draft = verifyWordsOnBoard(submitedLetters[2].boardId, 1);
          let pos = verifyWordsOnBoard(submitedLetters[2].boardId, 2)
          console.log(pos);
          draft.forEach((array) => {
            word = array.join("");
            console.log(word);
            wordChecker(word);
          });
          
        }
      } else {
        console.log("The player hasn't placed a tile")

      }
    }

    if (!firstMove) {
      firstMove = true;
    };
    if (allowedWord) {
      passTurnCounter = 0;
    } else {
      console.log("tentei mudar pass")
      passTurnCounter++
      
      if (passTurnCounter === 4) {
        endGameByPass();
      }
    }

    allowedWord = false;

  });


  // JS modal avatar
   

  const num = $('.ui-card').length;
  const even = num / 2;
  const odd = (num + 1) / 2;

  if (num % 2 == 0) {
    $('.ui-card:nth-child(' + even + ')').addClass('active');
    $('.ui-card:nth-child(' + even + ')').prev().addClass('prev');
    $('.ui-card:nth-child(' + even + ')').next().addClass('next');
  } else {
    $('.ui-card:nth-child(' + odd + ')').addClass('active');
    $('.ui-card:nth-child(' + odd + ')').prev().addClass('prev');
    $('.ui-card:nth-child(' + odd + ')').next().addClass('next');
  }

  $('.ui-card').click(function () {
    let slide = $('.active').width();
    if ($(this).hasClass('next')) {
      $('.container').stop(false, true).animate({ left: '-=' + slide });
    } else if ($(this).hasClass('prev')) {
      $('.container').stop(false, true).animate({ left: '+=' + slide });
    }

    $(this).removeClass('prev next');
    $(this).siblings().removeClass('prev active next');

    $(this).addClass('active');
    $(this).prev().addClass('prev');
    $(this).next().addClass('next');
  });


  // Keyboard nav
  $('#modalAvatar').on('keydown', function (e) {
    if (e.keyCode == 37) { // left
      $('.active').prev().trigger('click');
    }
    else if (e.keyCode == 39) { // right
      $('.active').next().trigger('click');
    }
  });

  function playAudio(audioName, extension) {
    const audio = document.createElement('audio');
    audio.src = `../sounds/${audioName}.${extension}`
    audio.play();
  }
  $('.ui-card').on('click', function () {
    playAudio('transition', 'wav');
  });

  $('#btn-choose').on('click', function () {
    $('#player-one .avatar-id').val(`${$('.active .avatar').attr('id')}`);
    $('.active').append(`<p>${$("#player-one .player-name").val()}</p>`)
    playAudio($('#player-one .avatar-id').val(), 'mp3')
    $('#player-one').css('display', 'none');
    $('#player-two').css('display', 'inline');
    $('#headingPlayer').html('AVATAR DO SEGUNDO JOGADOR');
  })

  $('#btn-start').on('click', function () {
    $('#player-two .avatar-id').val(`${$('.active .avatar').attr('id')}`);
    playAudio($('#player-two .avatar-id').val(), 'mp3')
    const players =
      [{ name: $('#player-one .player-name').val(), avatar_id: $('#player-one .avatar-id').val() },
      { name: $('#player-two .player-name').val(), avatar_id: $('#player-two .avatar-id').val() }]
    console.log(players)
    $("#player1-name").html(`${players[0].name}`)
    $("#player1-avatar").attr("src",`../images/${players[0].avatar_id}.webp`)
    $("#deck0-player").html(`deck do ${players[0].name}`)
    $("#player2-name").html(`${players[1].name}`)
    $("#player2-avatar").attr("src",`../images/${players[1].avatar_id}.webp`)
    $("#deck1-player").html(`deck do ${players[1].name}`)
    $(".modal-avatar").css("display","none");
  });
});