import {boardCreator , tripleWord , tripleLetter , doubleLetter , doubleWord } from './boardCreator.js'
$(document).ready(function () {
  //declare the positions where the player gets bonuses
  
  /* const tripleWord = [ [0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14] ];
  const doubleWord = [[1, 1],[2, 2],[3, 3],[4, 4],[4, 10],[7, 7],[3, 11],[2, 12],[1, 13],[13, 1],[12, 2],[11, 3],[10, 4],[10, 10],[11, 11],[12, 12],[13, 13] ];
  const tripleLetter = [ [5, 1], [1, 5], [5, 5], [9, 1], [9, 5], [13, 5], [1, 9], [5, 9], [5, 13], [9, 9], [9, 13], [13, 9] ];
  const doubleLetter = [ [3, 0], [11, 0], [0, 3], [0, 11], [6, 2], [2, 6], [7, 3], [3, 7], [8, 2], [2, 8], [6, 6], [8, 8], [6, 8], [8, 6], [14, 3], [3, 14], [6, 12], [12, 6], [11, 7], [7, 11], [12, 8], [8, 12], [14, 11], [11, 14] ]; */
  //not allowed type of words
  const classesNaoPermitidas = ["prefixo", "sufixo", ""];
  let allowedWord = false;
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
  let firstMove = false; //default false
  const boardRecord = [{xy:"88", letter:"M"}];
 /*  const url = {
    drawletters: "https://alpha-letters-backend.herokuapp.com/scrabble/drawletters/",
  }; */
  const firstPlayerTurn = { is: true };

  //function to validate the moves
  function validateTheMove(board_positions, players_turn, direction) {
    const allowedDirections = ["row" , "column"];
    let valid = false;
    let same_value;
    let different_values;
    let gapsExist = false;
    let copy;
    let diff;
    
    if(!players_turn) {
      //if is the first move check if has one tile in the center of the board
      board_positions.forEach(position=>{ 
        if (position.positionx === "7" && position.positiony === "7") {
          if ( allowedDirections.includes(direction) ) {
            
            console.log("entrei primeiro movimento avaliador");
            valid = true;
          }
        }
      })
    } else if ( allowedDirections.includes(direction) ){
      //if isn't the first move, then check if is in row or column direction
      console.log("entrei no de linha-coluna")
      //check if is next to a tile in the board
      if( isNextToATile(board_positions) ) {
        console.log("validei se está do lado")
        valid = true;
      }
    }

    if (!players_turn) {
      if (board_positions.length > 1) {
        if (direction === "row") {
          same_value = board_positions[0].positionx;
          different_values = selectTheRow(board_positions);
          copy = [...different_values];
          copy.map(value => Number(value) );
          for (let i = 0; i < copy.length ; i++) {
            diff = copy[i+1] - copy[i];
            if (diff > 1) {
              gapsExist = true;
              console.log("tem gaps")
            }
          }
        } else {
          same_value = board_positions[0].positiony;
          different_values = selectTheColumn(board_positions);
          copy = [...different_values];
          copy.map(value => Number(value) );
          for (let i = 0; i < copy.length ; i++) {
            diff = copy[i+1] - copy[i];
            if (diff > 1) {
              gapsExist = true;
              console.log("tem gaps")
            } 
          }
        }
      }
    }

    if (gapsExist) {
      valid = false;
    }
    return valid;
  }

  //function to check if the tiles are next to any placed tile on the board
  function isNextToATile(tiles_positions) {
    let answer = false;
    let condition = "";
    boardRecord.forEach( board_position => {
      tiles_positions.forEach (tile_position => {
        let xUp = (Number(tile_position.positionx) -1);
        let xDown = (Number(tile_position.positionx) +1);
        let yLeft = (Number(tile_position.positiony) -1);
        let yRight = (Number(tile_position.positiony) +1);
        let positionstoString = [ xUp, xDown , yLeft, yRight ];
        let positions = [`${positionstoString[0]}${tile_position.positiony}`, `${positionstoString[1]}${tile_position.positiony}`, `${tile_position.positionx}${positionstoString[2]}`, `${tile_position.positionx}${positionstoString[3]}`];
        if (board_position.xy === `${tile_position.positionx}${tile_position.positiony}`) {
          condition = "over";
          console.log(condition);
        } else if ( positions.includes(board_position.xy) ) {
          condition = "next";
          console.log(condition);
        }
      })
    })
    if (condition === "next") {
      answer = true;
    }

    return answer
  }

  boardCreator();

  //function to find gap between letters
  function getGaps(placed_positions) {
    let gaps = [];
    let diff = 0;
    let xy;
    let gap_value;
    let rowNumber;
    let y_values;
    let copy_y;

    //check if is row or columns
    if( findDirection(placed_positions) === "row" ) {
      rowNumber = placed_positions[0].positionx;
      //then get the column values
      let y_values = selectTheRow(placed_positions);
      copy_y = [...y_values];
      copy_y = copy_y.map(value => Number(value) ); 
      
      for (let i = 0; i < copy_y.length; i++) {
        diff = copy_y[i+1] - copy_y[i];
        if (diff>1) {
          for(let j = 1; j < diff; j++) {
            gap_value = copy_y[i] + j
            xy = `${rowNumber}${gap_value}`
            gaps.push(xy);
          }
        }
      }
    } else {
      let columnNumber = placed_positions[0].positiony;
      //get the row values
      let x_values = selectTheColumn(placed_positions);
      let copy_x = [...x_values];
      copy_x = copy_x.map(value => Number(value));
      for (let i = 0; i < copy_x.length ; i++) {
        diff = copy_x[i+1] - copy_x[i];
        if(diff>1) {
          for( let j = 1; j < diff; j++) {
            gap_value = copy_x[i] + j;
            xy = `${gap_value}${columnNumber}`
            gaps.push(xy)
          }
        }
      }
    }

    return gaps
  }

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
        $("#deck0").droppable();
      });
    } else {
      tilesPlayer2.forEach((tile) => {
        $("#deck1").append(
          `<div id="${tile.id}" letter="${tile.letter}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`
        );
        $("#deck1").droppable();
      });
    }
  }

  //function to get in which direction the player placed the letters
//reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
function findDirection(positions) {
  let x = [];
  let y = [];
  let direction = "not allowed";
  positions.forEach(item => {
    x.push(item.positionx);
    y.push(item.positiony);
  });

  if (x.every((elem, i, arr) => elem === arr[0])) {
    direction = "row"
    
  } else if (y.every((elem, i, arr) => elem == arr[0])) {
    direction = "column"
    
  }
  return direction;
}

//function for getting the values of the rows
function selectTheRow(ids) {
  let query = [];
  ids.forEach((id) => query.push(id.positiony));

  return query;
}

//function for getting the values of the columns
function selectTheColumn(ids) {
  let query = [];
  ids.forEach((id) => query.push(id.positionx));
  return query;
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
      $(`#${tile.id}`).draggable({ disabled: true },{revert: "invalid"})
    );
    tilesPlayer2.forEach((tile) =>
      $(`#${tile.id}`).draggable({ disabled: true },{revert: "invalid"})
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

  //function

  //function to change player
  function changePlayer() {
    return (firstPlayerTurn.is = !firstPlayerTurn.is);
  }

  //function to push letters when the word is allowed
  function pushLetters(word_passed, player) {
    console.log("moving letters")
    let obj = {xy:"", letter:""};
    if(word_passed) {
      if(!player) {
        for(let i=0; i< submitedLetters[2].boardId.length; i++){
          obj.xy = `${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`;
          obj.letter = `${submitedLetters[0].player1[i]}`
          boardRecord.push(obj);
        }
        //destroy draggable
        //delete letter from tilesPlayer1
      } else {
        console.log("moving player2 letters")
        for(let i=0; i< submitedLetters[2].boardId.length; i++){
          obj.xy = `${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`;
          obj.letter = `${submitedLetters[0].player2[i]}`
          boardRecord.push(obj);
        }
        //destroy draggable
        //delete letter from tilesPlayer2
      }
    } else {
      console.log("you should not pass!")
      if(player) {
        
      }
    }
  };

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
      submitedLetters[2].boardId = rearrangedIndexes.map( i => submitedLetters[2].boardId[i]);
      submitedLetters[0].player1 = rearrangedIndexes.map( i => submitedLetters[0].player1[i]);
      submitedLetters[0].playerId = rearrangedIndexes.map( i => submitedLetters[0].playerId[i]);
      return true
    } else {
      let y = selectTheRow(submitedLetters[2].boardId);
      let copyY = [...y];
      let orderedY = copyY.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedY.forEach(item=> rearrangedIndexes.push(y.indexOf(item)) )
      submitedLetters[2].boardId = rearrangedIndexes.map( i => submitedLetters[2].boardId[i]);
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


  //function to check if is allowed word
  async function wordChecker(word) {
    /* let isAllowed = $("#word").val(); */
    $.ajax({ url: `https://significado.herokuapp.com/${word}` }).done(data => {
        if ( !classesNaoPermitidas.includes(data[0].class) ) {
          allowedWord = true;
          pushLetters(allowedWord, firstPlayerTurn.is)
          //tirar o draggable da peça
          //
        } 
        
        //colocar o significado (só teste)
        /* if (allowedWord) {
          $("#meanings").html("");
          for (let i = 0; i <= data[0].meanings.length; i++) {
            let p = $("<p></p>");
            p.text(data[0].meanings[i]);
            $("#meanings").append(p);
          }
        } */
        console.log(allowedWord);
        
        return allowedWord;
      }).fail( er => console.log(er) )
      
  }

  
  /* async function dictionaryChecker (word) {
    let v;
    console.log("checking");
    try {v = await wordChecker(word) } 
    catch (e) {}
    finally {pushLetters(v)}
    
    return v
  } */


  //event listeners
  $("#endTurn").on("click", function () {
    let draft;
    let submittedDirection ;
    let gaps;
    //player 1 validations
    if (firstPlayerTurn.is) {
      if (submitedLetters[0].player1.length > 0) {
        submittedDirection = findDirection(submitedLetters[2].boardId);
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is)
          console.log (submitedLetters);
          //validation of player's move
          if ( validateTheMove(submitedLetters[2].boardId,firstMove, submittedDirection) ) {
            //check if is there are gaps among letters
            gaps = getGaps(submitedLetters[2].boardId);
            if (gaps.length === 0) {
              draft = submitedLetters[0].player1.join('');
              console.log(draft);
              console.log("living la vida loca!")
              wordChecker(draft)
             
            }
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if( validateTheMove(submitedLetters[2].boardId,firstMove, submittedDirection) ) {
            gaps = getGaps(submitedLetters[2].boardId);
            if (gaps.length === 0) {
              draft = submitedLetters[0].player1.join('');
              console.log(draft);
              console.log("living wild")
              wordChecker(draft)
            }
          } 
        }
      } else {
        console.log("player didn't play any tile");
      }
      //player 2 validations
    } else {
      if (submitedLetters[1].player2.length > 0) {
        if (submittedDirection === "row") {
          //sort letters by the column number
          rearrangeRowbyColumn(firstPlayerTurn.is);
          console.log(submitedLetters);
          if( validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection) ) {
            gaps = getGaps(submitedLetters[2].boardId);
            console.log(gaps);
            console.log("Faz um pix");
          }
        } else {
          //sort letters by the row number
          rearrangeColumnbyRow(firstPlayerTurn.is);
          console.log(submitedLetters);
          if( validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection) ) {
            gaps = getGaps(submitedLetters[2].boardId);
            console.log(gaps);
            console.log("animadaço");
          }
        }
      } else {
        console.log("player didn't play any tile");
      }
    }

  /*   if(!firstMove) {
      firstMove = true;
    }; */

    changePlayer();
    changeDisplayTurn();
  });
})
