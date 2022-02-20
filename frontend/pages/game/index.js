$(document).ready(function () {
  //declare the positions where the player gets bonuses
  const tripleWord = [ [0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14] ];
  const doubleWord = [[1, 1],[2, 2],[3, 3],[4, 4],[4, 10],[7, 7],[3, 11],[2, 12],[1, 13],[13, 1],[12, 2],[11, 3],[10, 4],[10, 10],[11, 11],[12, 12],[13, 13] ];
  const tripleLetter = [ [5, 1], [1, 5], [5, 5], [9, 1], [9, 5], [13, 5], [1, 9], [5, 9], [5, 13], [9, 9], [9, 13], [13, 9] ];
  const doubleLetter = [ [3, 0], [11, 0], [0, 3], [0, 11], [6, 2], [2, 6], [7, 3], [3, 7], [8, 2], [2, 8], [6, 6], [8, 8], [6, 8], [8, 6], [14, 3], [3, 14], [6, 12], [12, 6], [11, 7], [7, 11], [12, 8], [8, 12], [14, 11], [11, 14] ];
  //not allowed type of words
  const classesNaoPermitidas = ["prefixo", "sufixo", ""];
  let allowedWord = true;
  const nicknames = { player1: "Papagaio", player2: "Anta" };
  const submitedLetters = [
    { player1: [], playerId: [] },
    { player2: [], playerId: [] },
    { boardId: [] },
  ];
  //data received from get route drawletters
  const receivedData = [
    { letters: [], values: [], whichPlayer: "player1" },
    { letters: [], values: [], whichPlayer: "player2" },
    { lettersleft: 0 },
  ];
 /*  const url = {
    drawletters: "https://alpha-letters-backend.herokuapp.com/scrabble/drawletters/",
  }; */
  const firstPlayerTurn = { is: true };

  function boardCreator() {
    for (let i = 0; i < 15; i++) {
      let newRow = $('<div class="row"></div>');
      for (let j = 0; j < 15; j++) {
        let newCell = $('<div class="cell"></div>');
        newCell.attr("row-number", i);
        newCell.attr("column-number", j);
        newCell.attr("x", `${i}`);
        newCell.attr("y", `${j}`);
        newCell.addClass("droppable");
        // Helpful info: https://api.jqueryui.com/droppable/#event-out
        $(".droppable").droppable({
          drop: function (event, ui) {
            let draggedID = ui.draggable.attr("id");
            let draggedLetter = ui.draggable.attr("letter");
            let droppedPositionX = $(this).attr("x");
            let droppedPositionY = $(this).attr("y");

            wordDraftCreator(
              draggedID,
              draggedLetter,
              droppedPositionX,
              droppedPositionY,
              firstPlayerTurn.is
            );

            //console.log("dropped at row " + event.target.getAttribute("row-number") + " column " + event.target.getAttribute("column-number"))
            //check as dropped on the board cell
            //game_board[find_board_pos(droppableID)].tile = draggableID; <---------------
            //wordCheck(word) <--------------
            //If the player remove the letter:
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

  //function to record letters place on the boardgame
  function wordDraftCreator(id, letter, positionx, positiony, player) {
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

  //function to delete letters from draft when removed from the boardgame
  function takeWordFromDraft(id, player) {
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

  //function to rearrange array by column
  function rearrangeRowbyColumn(player) {
    if (player) {
      let y = selectTheRow(submitedLetters[2].boardId);
      let copyY = [...y];
      let orderedY = copyY.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedY.forEach(item=> rearrangedIndexes.push(y.indexOf(item)) );
      /* let orderedPos = rearrangedIndexes.map( i => submitedLetters[2].boardId[i]) */
      submitedLetters[2].boardId = rearrangedIndexes.map( i => submitedLetters[2].boardId[i]);
      /* let orderedLetters = rearrangedIndexes.map( i => submitedLetters[0].player1[i]); */
      submitedLetters[0].player1 = rearrangedIndexes.map( i => submitedLetters[0].player1[i]);
      submitedLetters[0].playerId = rearrangedIndexes.map( i => submitedLetters[0].playerId[i]);
      return true
    } else {
      let y = selectTheRow(submitedLetters[2].boardId);
      let copyY = [...y];
      let orderedY = copyY.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedY.forEach(item=> rearrangedIndexes.push(y.indexOf(item)) )
      /* let orderedPos = rearrangedIndexes.map( i => submitedLetters[2].boardId[i]) */
      submitedLetters[2].boardId = rearrangedIndexes.map( i => submitedLetters[2].boardId[i]);
      /* let orderedLetters = rearrangedIndexes.map( i => submitedLetters[0].player1[i]); */
      submitedLetters[1].player2 = rearrangedIndexes.map( i => submitedLetters[1].player2[i]);
      submitedLetters[1].playerId = rearrangedIndexes.map( i => submitedLetters[1].playerId[i]);
      return true
    }
    
  }

  //function to rearrange array by row
  function rearrangeColumnbyRow(player) {
    if (player) {
      let x = selectTheColumn(submitedLetters[2].boardId);
      let copyX = [...x];
      console.log(copyX)
      let orderedX = copyX.sort( (a,b) => a - b );
      let rearrangedIndexes = [];
      orderedX.forEach( item => rearrangedIndexes.push(x.indexOf(item)) );
      submitedLetters[2].boardId = rearrangedIndexes.map( i => submitedLetters[2].boardId[i] );
      submitedLetters[0].player1 = rearrangedIndexes.map( i => submitedLetters[0].player1[i]);
      submitedLetters[0].playerId = rearrangedIndexes.map( i => submitedLetters[0].playerId[i]);
      return true
    } else {
      let x = selectTheColumn(submitedLetters[2].boardId);
      let copyX = [...x];
      let orderedX = copyX.sort( (a,b) => a - b );
      let rearrangedIndexes = [];
      orderedX.forEach( item => rearrangedIndexes.push(x.indexOf(item)) );
      submitedLetters[2].boardId = rearrangedIndexes.map( i => submitedLetters[2].boardId[i] );
      submitedLetters[1].player2 = rearrangedIndexes.map( i => submitedLetters[1].player2[i]);
      submitedLetters[1].playerId = rearrangedIndexes.map( i => submitedLetters[1].playerId[i]);
      return true
    }
  }

  boardCreator();
  //programação do modal
  const avatars = Array.from(document.getElementsByClassName("avatars"));
  const avatarIDs = [
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar4",
    "avatar5",
    "avatar6",
  ];
  const avatarsTags = [
    "$('#avatar1')",
    "$('#avatar2')",
    "$('#avatar3')",
    "$('#avatar4')",
    "$('#avatar5')",
    "$('#avatar6')",
  ];

  function modalhandler() {
    avatars.map((avatar) => {
      avatar.addEventListener("click", (event) => {
        //aqui estava querendo mudar o fundo da tag figure que contém a img para mostrar que selecionou
        let parentID = event.target.parentNode.id;
        $(parentID).css("background-color", "yellow");
      });
    });
  }

  //modalhandler()

  //record of letters of each player's deck
  const tilesPlayer1 = [
    { id: "deck0_piece0", letter: "", value: 0 },
    { id: "deck0_piece1", letter: "", value: 0 },
    { id: "deck0_piece2", letter: "", value: 0 },
    { id: "deck0_piece3", letter: "", value: 0 },
    { id: "deck0_piece4", letter: "", value: 0 },
    { id: "deck0_piece5", letter: "", value: 0 },
    { id: "deck0_piece6", letter: "", value: 0 },
  ];
  const tilesPlayer2 = [
    { id: "deck1_piece0", letter: "", value: 0 },
    { id: "deck1_piece1", letter: "", value: 0 },
    { id: "deck1_piece2", letter: "", value: 0 },
    { id: "deck1_piece3", letter: "", value: 0 },
    { id: "deck1_piece4", letter: "", value: 0 },
    { id: "deck1_piece5", letter: "", value: 0 },
    { id: "deck1_piece6", letter: "", value: 0 },
  ];
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
  //Depois passar todas estas funções para um arquivo separado
  //1. Função para começar o jogo: Depois de ter criado o avatar e ter apertado algum botão.
  //A função realiza dois fetchs, um para cada jogador, recebe as letras e as coloca no deck do jogador
  $("#requestButton").click(function requestFirstLetters() {
    const url = "http://localhost:3000/scrabble/drawletters/";

    //request the first 7 letters for player1
    $.get(/* url.drawletters */url + "1/7", function (data) {
      receivedData[0].letters.push(data.letters);
      receivedData[0].values.push(data.values);
      receivedData[0].whichPlayer = "player1";
      let { letters, values, whichPlayer } = { ...receivedData[0] };
      lettersToPlayersDeck(letters, values, whichPlayer);
    });
    //request the first 7 letters for player2
    $.get(/* url.drawletters */url + "2/7", function (data) {
      receivedData[1].letters.push(data.letters);
      receivedData[1].values.push(data.values);
      receivedData[1].whichPlayer = "player2";
      receivedData[2].lettersleft = data.lettersLeft;
      let { letters, values, whichPlayer } = { ...receivedData[1] };
      lettersToPlayersDeck(letters, values, whichPlayer);
    });
  });

  //2. Create a function to create each player's deck
  function createDeck(player) {
    if (player === "player1") {
      tilesPlayer1.forEach((tile) => {
        $("#deck0").append(
          `<div id="${tile.id}" letter="${tile.letter}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`
        );
      });
    } else {
      tilesPlayer2.forEach((tile) => {
        $("#deck1").append(
          `<div id="${tile.id}" letter="${tile.letter}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`
        );
      });
    }
  }

  //function to check which tile is available from player's deck record and place the letter
  function lettersToPlayersDeck(letters, values, player) {
    let i = 0;

    if (player === "player1") {
      tilesPlayer1.forEach((tile) => {
        if (tile.letter === "") {
          tile.letter = letters[0][i];
          tile.value = values[0][i];
          i++;
        }
      });
    } else {
      tilesPlayer2.forEach((tile) => {
        if (tile.letter === "") {
          tile.letter = letters[0][i];
          tile.value = values[0][i];
          i++;
        }
      });
    }
    createDeck(player);
  }

  //function to handle turn, and let player drag tiles to the board
  //the tile will only be draggable when it's player's turn
  //check here for references https://jqueryui.com/draggable/
  $("#playButton").on("click", function () {
    tilesPlayer1.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true })
    );
    tilesPlayer2.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true })
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

  $("#endTurn").on("click", function () {
    
    if (firstPlayerTurn.is) {
      if (submitedLetters[0].player1.length > 0) {
        if (isInRowDirection(submitedLetters[2].boardId)) {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is)
          console.log (submitedLetters);
          
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
        }
      } else {
        console.log("player didn't play any tile");
      }
    } else {
      if (submitedLetters[1].player2.length > 0) {
        if (isInRowDirection(submitedLetters[2].boardId)) {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
        }
      } else {
        console.log("player didn't play any tile");
      }
    }

    changePlayer();
    changeDisplayTurn();
  });

  function changePlayer() {
    return (firstPlayerTurn.is = !firstPlayerTurn.is);
  }

  //function to get in which direction the player placed the letters
  //reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  function isInRowDirection(positions) {
    let x = [];
    let y = [];
    positions.forEach((position) => {
      x.push(position.x);
      y.push(position.y);
    });

    if (x.every((elem, i, arr) => elem === arr[0])) {
      return true;
    } else if (y.every((elem, i, arr) => elem === arr[0])) {
      return false;
    }
  }

  function selectTheRow(ids) {
    let query = [];
    ids.forEach((id) => query.push(id.positiony));

    return query;
  }

  function selectTheColumn(ids) {
    let query = [];
    ids.forEach((id) => query.push(id.positionx));
    return query;
  }

  //function to get drop events on the board
  function find_letter(given_id) {
    // Go through the 7 pieces,
    for (var i = 0; i < 7; i++) {
      // If we found the piece we're looking for, awesome!
      if (game_tiles[i].id == given_id) {
        // Just return its letter!
        return game_tiles[i].letter;
      }
    }
  }

  //function to check if is allowed word
  function wordCheck(word) {
    /* let isAllowed = $("#word").val(); */
    $.ajax({ url: `https://significado.herokuapp.com/${word}` }).done(
      (data) => {
        console.log(data);
        if (classesNaoPermitidas.includes(data[0].class)) {
          allowedWord = false;
        }

        //colocar o significado (só teste)
        if (allowedWord) {
          $("#meanings").html("");
          for (let i = 0; i <= data[0].meanings.length; i++) {
            let p = $("<p></p>");
            p.text(data[0].meanings[i]);
            $("#meanings").append(p);
          }
        }
        console.log(allowedWord);
        return allowedWord;
      }
    );
  }
});
