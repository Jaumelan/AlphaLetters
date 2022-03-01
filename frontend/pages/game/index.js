
  //declare the positions where the player gets bonuses
  import {boardCreator} from './boardCreator.js'
  import {resetVariables} from './resetVariables.js'
  import {pushLettersToNewBoard, verifyWordsOnBoard} from './newBoard.js'
  import {validateTheMove, isNextToATile} from './validateMove.js'
  import {findDirection} from './findDirection.js'
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
  } from './constants.js'

import {lettersToPlayersDeck,removeFromDeck, returnTilestoPlayersDeck  } from './deck.js'
import {pushLetters, rearrangeRowbyColumn, rearrangeColumnbyRow} from "./player.js"
import {requestScores, changePlayer} from "./getScore.js"

$(document).ready(function () {
   let allowedWord = false
   let firstMove = false;
  // const tripleWord = [ [0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14] ];
  // const doubleWord = [ [1, 1], [2, 2], [3, 3], [4, 4], [4, 10], [7, 7], [3, 11], [2, 12], [1, 13], [13, 1], [12, 2], [11, 3], [10, 4], [10, 10], [11, 11], [12, 12], [13, 13] ];
  // const tripleLetter = [ [5, 1], [1, 5], [5, 5], [9, 1], [9, 5], [13, 5], [1, 9], [5, 9], [5, 13], [9, 9], [9, 13], [13, 9] ];
  // const doubleLetter = [[3, 0],[11, 0],[0, 3],[0, 11],[6, 2],[2, 6],[7, 3],[3, 7],[8, 2],[2, 8],[6, 6],[8, 8],[6, 8],[8, 6],[14, 3],[3, 14],[6, 12],[12, 6],[11, 7],[7, 11],[12, 8],[8, 12],[14, 11],[11, 14] ];
  //not allowed type of words
  // const classesNaoPermitidas = ["prefixo", "sufixo"];
  // let allowedWord = false;
  // let newBoard = [
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  //   ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  // ];
  // const nicknames = { player1: "Papagaio", player2: "Anta" };
  // const submitedLetters = [
  //   { player1: [], playerId: [] },
  //   { player2: [], playerId: [] },
  //   { boardId: [] },
  // ];
  // //data received from get route drawletters
  // const receivedData = [
  //   { letters: [], values: [], whichPlayer: "player1" },
  //   { letters: [], values: [], whichPlayer: "player2" },
  //   { lettersleft: 0 },
  // ];
  // let firstMove = false; //default false
  // let boardRecord = [/* { xy: "88", letter: "M" } */];

  // function resetVariables() {
  //   console.log("reset variables", submitedLetters);
  //   submitedLetters[0].player1 = [];
  //   submitedLetters[0].playerId = [];
  //   submitedLetters[1].player2 = [];
  //   submitedLetters[1].playerId = [];
  //   submitedLetters[2].boardId = [];

  //   receivedData[0].letters = [];
  //   receivedData[0].values = [];
  //   receivedData[1].letters = [];
  //   receivedData[1].values = [];
  //   receivedData[2];
  // };

  //record of letters of each player's deck
  // const tilesPlayer1 = [
  //   { id: "deck0_piece0", letter: "", value: 0 },
  //   { id: "deck0_piece1", letter: "", value: 0 },
  //   { id: "deck0_piece2", letter: "", value: 0 },
  //   { id: "deck0_piece3", letter: "", value: 0 },
  //   { id: "deck0_piece4", letter: "", value: 0 },
  //   { id: "deck0_piece5", letter: "", value: 0 },
  //   { id: "deck0_piece6", letter: "", value: 0 },
  // ];

  // const tilesPlayer2 = [
  //   { id: "deck1_piece0", letter: "", value: 0 },
  //   { id: "deck1_piece1", letter: "", value: 0 },
  //   { id: "deck1_piece2", letter: "", value: 0 },
  //   { id: "deck1_piece3", letter: "", value: 0 },
  //   { id: "deck1_piece4", letter: "", value: 0 },
  //   { id: "deck1_piece5", letter: "", value: 0 },
  //   { id: "deck1_piece6", letter: "", value: 0 },
  // ];

  // let droppedID = []

  // function boardCreator() {
  //   for (let i = 0; i < 15; i++) {
  //     let newRow = $('<div class="row"></div>');
  //     for (let j = 0; j < 15; j++) {
  //       let newCell = $('<div class="cell"></div>');
  //       newCell.attr("row-number", i);
  //       newCell.attr("column-number", j);
  //       newCell.attr("x", `${i}`);
  //       newCell.attr("y", `${j}`);
  //       newCell.attr("id", `${i}${j}`);
  //       newCell.addClass("droppable");
  //       // Helpful info: https://api.jqueryui.com/droppable/#event-out
  //       $(".droppable").droppable({
  //         drop: function (event, ui) {
  //           let draggedID = ui.draggable.attr("id");
  //           let draggedLetter = ui.draggable.attr("letter");
  //           let droppedPositionX = $(this).attr("x");
  //           let droppedPositionY = $(this).attr("y");
  //           /* let iddropito = $(this).attr("id");
  //           console.log(iddropito); */

  //           wordDraftCreator(
  //             draggedID,
  //             draggedLetter,
  //             droppedPositionX,
  //             droppedPositionY,
  //             firstPlayerTurn.is
  //           );
  //         },
  //         out: function (event, ui) {
  //           let draggedID = ui.draggable.attr("id");

  //           let droppedPosition = $(this).attr("xy");
  //           takeWordFromDraft(draggedID, firstPlayerTurn.is);
  //           //create a function to handle moving another one by mistake
  //         },
  //       });

  //       newRow.append(newCell);
  //       tripleWord.forEach((xy) => {
  //         if (xy[0] === i && xy[1] === j) {
  //           newCell.addClass("tripleWord");
  //           newCell.html("TP");
  //         }
  //       });
  //       doubleWord.forEach((xy) => {
  //         if (xy[0] === i && xy[1] === j) {
  //           newCell.addClass("doubleWord");
  //           newCell.html("DP");
  //         }
  //       });
  //       tripleLetter.forEach((xy) => {
  //         if (xy[0] === i && xy[1] === j) {
  //           newCell.addClass("tripleLetter");
  //           newCell.html("TL");
  //         }
  //       });

  //       doubleLetter.forEach((xy) => {
  //         if (xy[0] === i && xy[1] === j) {
  //           newCell.addClass("doubleLetter");
  //           newCell.html("DL");
  //         }
  //       });
  //     }
  //     $("#gameboard").append(newRow);
  //   }
  // }

  //function to validate the moves
  // function validateTheMove(boardPositions, secondMove, direction) {
  //   const allowedDirections = ["row", "column"];
  //   let valid = false;
  //   let same_value;
  //   let different_values;
  //   let copy;
  //   let diff;
  //   let center = false;
       

  //   if (!secondMove) {
  //     let gapsExist = false;
  //     // is it the center?
  //     boardPositions.forEach( position => {
  //       if (position.positionx === "7" && position.positiony === "7") {
  //         center = true;
  //       }
  //     });
  //     //check if has only one tile
  //     if (boardPositions.length === 1) {
  //       if (center) {
  //         valid = true;
  //       }
  //     } else if ( allowedDirections.includes(direction) ) {
  //       if (direction === "row") {
  //         same_value = boardPositions[0].positionx;
  //         different_values = selectTheRow(boardPositions);
  //         copy = [...different_values];
  //         copy.map((value) => Number(value));
  //         for (let i = 0; i < copy.length; i++) {
  //           diff = copy[i + 1] - copy[i];
  //           if (diff > 1) {
  //             gapsExist = true;
  //           }
  //         }
  //       } else if (direction === "column") {
  //         same_value = boardPositions[0].positiony;
  //         different_values = selectTheColumn(boardPositions);
  //         copy = [...different_values];
  //         copy.map((value) => Number(value));
  //         for (let i = 0; i < copy.length; i++) {
  //           diff = copy[i + 1] - copy[i];
  //           if (diff > 1) {
  //             gapsExist = true;
  //           }
  //         }
  //       }
  //     }
  //     if (!gapsExist) {
  //       valid = true;
  //     }
  //   } else if (boardPositions.length === 1) {
  //     if (isNextToATile(boardPositions)) {
  //       valid = true;
  //     }
  //   } else if (allowedDirections.includes(direction)) {
  //     //if isn't the first move, then check if is in row or column direction

  //     //check if is next to a tile in the board
  //     if (isNextToATile(boardPositions)) {

  //       valid = true;
  //     }
  //   }
    
  //     return valid;
  // }
  
  // //function to check if the tiles are next to any placed tile on the board
  // function isNextToATile(tiles_positions) {
    
  //   let answer = false;
  //   let condition = "";
  //   console.log(boardRecord);
  //   boardRecord.forEach( boardPosition => {
      
  //     tiles_positions.forEach(tile_position => {
  //       let xUp = Number(tile_position.positionx) - 1;
  //       let xDown = Number(tile_position.positionx) + 1;
  //       let yLeft = Number(tile_position.positiony) - 1;
  //       let yRight = Number(tile_position.positiony) + 1;
  //       let nextPositions = [xUp, xDown, yLeft, yRight];
  //       let positions = [
  //         `${nextPositions[0]}${tile_position.positiony}`,
  //         `${nextPositions[1]}${tile_position.positiony}`,
  //         `${tile_position.positionx}${nextPositions[2]}`,
  //         `${tile_position.positionx}${nextPositions[3]}`,
          
  //       ];
  //       console.log("positions ", positions, "boardposition.xy", boardPosition.xy);
  //       if (boardPosition.xy === `${tile_position.positionx}${tile_position.positiony}`) {
  //         //the player has placed over a tile <-----------------------------------------------
  //         condition = "over";
  //       } else if (positions.includes(boardPosition.xy)) {
  //         condition = "next";
  //       }
  //     });
  //   });
  //   if (condition === "next") {
  //     answer = true;
  //   }
    
  //   console.log("next to a tile ",answer);
  //   return answer;
  // };

  // //function to find gap between letters
  // function getGaps(placed_positions) {
  //   let gaps = [];
  //   let diff = 0;
  //   let xy;
  //   let gap_value;
  //   let rowNumber;
  //   let y_values;
  //   let copy_y;

  //   //check if is row or columns
  //   if (findDirection(placed_positions) === "row") {
  //     rowNumber = placed_positions[0].positionx;
  //     //then get the column values
  //     let y_values = selectTheRow(placed_positions);
  //     copy_y = [...y_values];
  //     copy_y = copy_y.map((value) => Number(value));

  //     for (let i = 0; i < copy_y.length; i++) {
  //       diff = copy_y[i + 1] - copy_y[i];
  //       if (diff > 1) {
  //         for (let j = 1; j < diff; j++) {
  //           gap_value = copy_y[i] + j;
  //           xy = `${rowNumber}${gap_value}`;
  //           gaps.push(xy);
  //         }
  //       }
  //     }
  //   } else {
  //     let columnNumber = placed_positions[0].positiony;
  //     //get the row values
  //     let x_values = selectTheColumn(placed_positions);
  //     let copy_x = [...x_values];
  //     copy_x = copy_x.map((value) => Number(value));
  //     for (let i = 0; i < copy_x.length; i++) {
  //       diff = copy_x[i + 1] - copy_x[i];
  //       if (diff > 1) {
  //         for (let j = 1; j < diff; j++) {
  //           gap_value = copy_x[i] + j;
  //           xy = `${gap_value}${columnNumber}`;
  //           gaps.push(xy);
  //         }
  //       }
  //     }
  //   }

  //   return gaps;
  // }

  //function to push letters when the word is allowed
  // function pushLettersToNewBoard(player) {
  //   console.log("moving letters");
  //   let x;
  //   let y;
  //   let letter;

  //   if (player) {
  //     for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
  //       x = Number(submitedLetters[2].boardId[i].positionx);
  //       y = Number(submitedLetters[2].boardId[i].positiony);
  //       newBoard[x][y] = `${submitedLetters[0].player1[i]}`;
  //     }
  //   } else {
  //     console.log("moving player2 letters");
  //     for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
  //       x = Number(submitedLetters[2].boardId[i].positionx);
  //       y = Number(submitedLetters[2].boardId[i].positiony);
  //       newBoard[x][y] = `${submitedLetters[1].player2[i]}`;
  //     }
  //   }
  //   return true;
  // }

  // function verifyWordsOnBoard(positions_placed, which_array) {
  //   let draft = [];
  //   let position = [];
  //   let amount_of_tiles = positions_placed.length;
  //   let first_x = Number(positions_placed[0].positionx);
  //   let first_y = Number(positions_placed[0].positiony);
  //   let last_x = Number(positions_placed[amount_of_tiles - 1].positionx);
  //   let last_y = Number(positions_placed[amount_of_tiles - 1].positiony);
  //   let diff_x = last_x - first_x;
  //   let diff_y = last_y - first_y;
  //   let drafts = [];
  //   let positions = [];
  //   let answer;

  //   if (amount_of_tiles > 1) {
  //     //is row or column?
  //     if (findDirection(positions_placed) === "row") {
  //       ///values in x still equal
  //       //try to find letters before my first y
  //       let j = 1;
  //       while (newBoard[first_x][first_y - j] !== "" ) {
  //         draft.unshift(newBoard[first_x][first_y - j]);
  //         position.unshift({posx:`${first_x}`,posy:`${first_y - j}`});
  //         j++;
  //       }
  //       //get the first letter
  //       draft.push(newBoard[first_x][first_y]);
  //       position.push({posx:`${first_x}`,posy:`${first_y}`})

  //       //try to fill the gaps if they are
  //       for (let index = 1; index < diff_y; index++) {
  //         draft.push(newBoard[first_x][first_y + index]);
  //         position.push({posx:`${first_x}`,posy:`${first_y + index}`});
  //       }
  //       //get the last letter
  //       draft.push(newBoard[last_x][last_y]);
  //       position.push({posx:`${last_x}`,posy:`${last_y}`});
  //       j = 1;
  //       //try to add letters at the end if exist
  //       while (newBoard[first_x][last_y + j] !== "") {
  //         draft.push(newBoard[first_x][last_y + j]);
  //         position.push({posx:`${first_x}`,posy:`${last_y + j}`});
  //         j++;
  //       }
  //     } else {
  //       let i = 1;
  //       while (newBoard[first_x - i][first_y] !== "") {
  //         draft.unshift(newBoard[first_x - i][first_y]);
  //         position.push({posx:`${first_x - i}`,posy:`${first_y}`});
  //         i++;
  //       }

  //       draft.push(newBoard[first_x][first_y]);
  //       position.push({posx:`${first_x}`,posy:`${first_y}`});

  //       for (let index = 1; index < diff_x; index++) {
  //         draft.push(newBoard[first_x + index][first_y]);
  //         position.push({posx:`${first_x + index}`,posy:`${first_y}`});
  //       }

  //       draft.push(newBoard[last_x][last_y]);
  //       position.push({posx:`${last_x}`,posy:`${last_y}`});
  //       i = 1;
  //       while (newBoard[last_x + i][last_y] !== "") {
  //         draft.push(newBoard[last_x + i][last_y]);
  //         position.push({posx:`${last_x + i}`,posy:`${last_y}`});
  //         i++;
  //       }
  //     }
  //     //for only one tile placed on board
  //   } else {
  //     let j = 1;
  //     while (newBoard[first_x][first_y - j] !== "") {
  //       draft.unshift(newBoard[first_x][first_y - j]);
  //       position.unshift({posx:`${first_x}`,posy:`${first_y - j}`});
  //       j++;
  //     }
  //     draft.push(newBoard[first_x][first_y]);
  //     position.push({posx:`${first_x}`,posy:`${first_y}`});
  //     j = 1;
  //     while (newBoard[first_x][last_y + j] !== "") {
  //       draft.push(newBoard[first_x][last_y + j]);
  //       position.push({posx:`${first_x}`,posy:`${last_y + j}`});
  //       j++;
  //     }

  //     if (draft.length < 2) {
  //       draft = [];
  //       position = [];
  //     } else {
  //       drafts.push(draft);

  //     }
  //     draft = [];
  //     let i = 1;
  //     while (newBoard[first_x - i][first_y] !== "") {
  //       draft.unshift(newBoard[first_x - i][first_y]);
  //       position.unshift({posx:`${first_x - i}`,posy:`${first_y}`});
  //       i++;
  //     }

  //     draft.push(newBoard[first_x][first_y]);
  //     position.push({posx:`${first_x}`,posy:`${first_y}`});

  //     i = 1;
  //     while (newBoard[last_x + i][last_y] !== "") {
  //       draft.push(newBoard[last_x + i][last_y]);
  //       position.push({posx:`${last_x + i}`,posy:`${last_y}`});
  //       i++;
  //     }
      
  //   }
    
  //   if (draft.length < 2) {
  //     draft = [];
  //   } else {
  //     drafts.push(draft);
  //     positions.push(position);
  //   }
  //   if(which_array === 1) {
  //     answer = drafts;
  //   } else {
  //     answer = position/* positions */;
  //   }
  //   console.log(answer);
  //   return answer;
  // }

  //function to request scores
  // function requestScores() {
  //   let positions = verifyWordsOnBoard(submitedLetters[2].boardId, 2);
  //   positions = JSON.stringify(positions);
  //   let letters = JSON.stringify(verifyWordsOnBoard(submitedLetters[2].boardId, 1));
  //   console.log("pos ", positions, "letters ", letters);
  //   console.log("antes do score ",submitedLetters);
  //   $.get("http://localhost:3000/scrabble/score",{positions, letters})
  //   .done(answer => {
  //     let score = JSON.parse(answer)
  //     return score}).done(score => {
  //     let value;
  //     console.log("score ",score)
      
  //     if (firstPlayerTurn.is) {
  //       value = Number($("#player1-score").text()) + Number(score);   
  //       $("#player1-score").text("");
  //       $("#player1-score").text(value);
  //     } else {
  //       let a = Number($("#player2-score").text())
  //       console.log("a ",a);
  //       value = Number($("#player2-score").text()) + Number(score);
  //       $("#player2-score").text("");
  //       $("#player2-score").text(value);
  //     }
      
  //   }).done(()=> {
  //     //clonar o id clone()
  //     appendToBoard(firstPlayerTurn.is)
  //     removeTiles(firstPlayerTurn.is);
     
  //   }).done(()=>{
  //     /* resetVariables(); */
  //     changePlayer();
  //   })   
     
  //     return true
  // };

  //function to append to board-game
  // function appendToBoard(player) {
  //   console.log("appendando, meus parça")
  //   console.log(submitedLetters)
  //   if(player) {
  //     console.log("jogador 1")
  //     for (let i=0; i<submitedLetters[0].playerId.length;i++) {
        
  //         $(`#${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`).text("");
  //         $(`#${submitedLetters[0].playerId[i]}`).attr("id",`piece${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`)
  //         $(`#piece${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`).appendTo(`#${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`)
  //         .css("left","0px")
  //         .css("top", "0px");
  //     }
  //   } else {
  //     for (let i=0; i<submitedLetters[1].playerId.length;i++) {
        
  //       $(`#${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`).text("");
  //       $(`#${submitedLetters[1].playerId[i]}`).attr("id",`piece${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`)
  //       $(`#piece${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`).appendTo(`#${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`)
  //       .css("left","0px")
  //       .css("top", "0px");
  //   }
  //   }
  // }

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
  

  //2. Create a function to create each player's deck
  // function createDeck(player) {
  //   if (player === "player1") {
  //     tilesPlayer1.forEach((tile) => {
  //       $("#deck0").append(
  //         `<div id="${tile.id}" letter="${tile.letter}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`
  //       );
  //       $("#deck0").droppable();
  //     });
  //   } else {
  //     tilesPlayer2.forEach((tile) => {
  //       $("#deck1").append(
  //         `<div id="${tile.id}" letter="${tile.letter}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`
  //       );
  //       $("#deck1").droppable();
  //     });
  //   }
  // }

  //function to get in which direction the player placed the letters
  //reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  // function findDirection(positions) {
  //   let x = [];
  //   let y = [];
  //   let direction = "not allowed";
  //   positions.forEach((item) => {
  //     x.push(item.positionx);
  //     y.push(item.positiony);
  //   });
    
  //   if (x.every((elem, i, arr) => elem === arr[0])) {
  //     direction = "row";
  //   } else if (y.every((elem, i, arr) => elem == arr[0])) {
  //     direction = "column";
  //   }
  //   return direction;
  // }

  //function for getting the values of the rows
  // function selectTheRow(ids) {
  //   let query = [];
  //   ids.forEach((id) => query.push(id.positiony));

  //   return query;
  // }

  //function for getting the values of the columns
  // function selectTheColumn(ids) {
  //   let query = [];
  //   ids.forEach((id) => query.push(id.positionx));
  //   return query;
  // }

  //function to check which tile is available from player's deck record and place the letter
  // function lettersToPlayersDeck(letters, values, player) {
  //   let i = 0;

  //   if (player === "player1") {
  //     tilesPlayer1.forEach((tile) => {
  //       if (tile.letter === "") {
  //         tile.letter = letters[0][i];
  //         tile.value = values[0][i];
  //         i++;
  //       }
  //     });
  //   } else {
  //     tilesPlayer2.forEach((tile) => {
  //       if (tile.letter === "") {
  //         tile.letter = letters[0][i];
  //         tile.value = values[0][i];
  //         i++;
  //       }
  //     });
  //   }
  //   createDeck(player);
  // };

  //function return tiles to player
  // function returnTilestoPlayersDeck(player) {
  //   console.log("destroying");

  //   if (player) {
  //     console.log("primeiro jogador");
  //     tilesPlayer1.forEach((tile) => {
  //       $(`#${tile.id}`).remove();
  //     });
  //     let { letters, values, whichPlayer } = { ...receivedData[0] };
  //     lettersToPlayersDeck(letters, values, whichPlayer);
  //   } else {
  //     console.log("segundo jogador");
  //     tilesPlayer2.forEach((tile) => {
  //       $(`#${tile.id}`).remove();
  //     });
  //     let { letters, values, whichPlayer } = { ...receivedData[1] };
  //     lettersToPlayersDeck(letters, values, whichPlayer);
  //   }
  // }

  //Function to remove played letters from player's hand
  // function removeTiles(player) {
  //   console.log("removing ids")
  //   if(player) {
  //     console.log(submitedLetters)
  //     submitedLetters[0].playerId.forEach(subTile=>{
  //       tilesPlayer1.forEach( tile=> {
  //         if(tile.id === subTile) {
  //           tile.letter = "";
  //           tile.value = 0;
  //         }
  //       })
  //     })
  //     console.log(tilesPlayer1);
  //   } else {
  //     console.log(submitedLetters)
  //     submitedLetters[1].playerId.forEach(subTile=>{
  //       tilesPlayer2.forEach( tile=> {
  //         if(tile.id === subTile) {
  //           tile.letter = "";
  //           tile.value = 0;
  //         }
  //       })
  //     })
  //     console.log(tilesPlayer2);
  //   }
  //   resetVariables()
  // };

  //function to change player
  // function changePlayer() {
  //   return (firstPlayerTurn.is = !firstPlayerTurn.is);
  // }

  //function to push letters when the word is allowed
  // function pushLetters(player) {
  //   console.log("moving letters");
  //   let xy = "";
  //   let letter = "";
    
  //   if (player) {
  //     for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
  //       xy = `${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`;
  //       letter = `${submitedLetters[0].player1[i]}`;
  //       boardRecord.push({xy,letter});
  //     }
      
  //   } else {
  //     for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
  //       xy = `${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`;
  //       letter = `${submitedLetters[1].player2[i]}`;
  //       boardRecord.push({xy,letter});
  //     }
  //   }
  // }

  //function to record letters place on the boardgame
  // function wordDraftCreator(id, letter, positionx, positiony, player) {
  //   if (player) {
  //     submitedLetters[0].player1.push(letter);
  //     submitedLetters[0].playerId.push(id);
  //     submitedLetters[2].boardId.push({ positionx, positiony });
  //   } else {
  //     submitedLetters[1].player2.push(letter);
  //     submitedLetters[1].playerId.push(id);
  //     submitedLetters[2].boardId.push({ positionx, positiony });
  //   }
  // }

  //function to delete letters from draft when removed from the boardgame
  // function takeWordFromDraft(id, player) {
  //   if (player) {
  //     let index = submitedLetters[0].playerId.indexOf(id);
  //     if (index > -1) {
  //       submitedLetters[0].player1.splice(index, 1);
  //       submitedLetters[0].playerId.splice(index, 1);
  //       submitedLetters[2].boardId.splice(index, 1);
  //     }
  //   } else {
  //     let index = submitedLetters[1].playerId.indexOf(id);
  //     if (index > -1) {
  //       submitedLetters[1].player2.splice(index, 1);
  //       submitedLetters[1].playerId.splice(index, 1);
  //       submitedLetters[2].boardId.splice(index, 1);
  //     }
  //   }
  // }

  // function getLettersFromBoard(gaps_array) {
  //   let letters = [];
  //   gaps_array.forEach((gap) => {
  //     boardRecord.forEach((record) => {
  //       if (gap == record.xy) {
  //         letters.push(record.letter);
  //       }
  //     });
  //   });
  //   return letters;
  // }

  //function to delete player's letters from it's deck and place it on the board
  // function removeFromDeck() {
  //   console.log("removing ids");
    
  //   if (firstPlayerTurn.is) {
  //     submitedLetters[0].playerId.forEach(id => {
  //       $(`#${id}`).draggable("option", "disabled", true );
  //       $(`#${id}`).addClass("placed");
  //       /* $(`#${id}`).removeAttr("id"); */
  //     });
  //     console.log()
  //   } else {
  //     submitedLetters[1].playerId.forEach((id) => {
  //       $(`#${id}`).draggable("option", "disabled", true);
  //       $(`#${id}`).addClass("placed");
  //       /* $(`#${id}`).removeAttr("id"); */
  //     });
  //   }
  // }

  //function to rearrange array by column
  // function rearrangeRowbyColumn(player) {
  //   if (player) {
  //     let y = selectTheRow(submitedLetters[2].boardId);
  //     let copyY = [...y];
  //     let orderedY = copyY.sort((a, b) => a - b);
  //     let rearrangedIndexes = [];
  //     orderedY.forEach((item) => rearrangedIndexes.push(y.indexOf(item)));
  //     submitedLetters[2].boardId = rearrangedIndexes.map(
  //       (i) => submitedLetters[2].boardId[i]
  //     );
  //     submitedLetters[0].player1 = rearrangedIndexes.map(
  //       (i) => submitedLetters[0].player1[i]
  //     );
  //     submitedLetters[0].playerId = rearrangedIndexes.map(
  //       (i) => submitedLetters[0].playerId[i]
  //     );
  //     return true;
  //   } else {
  //     let y = selectTheRow(submitedLetters[2].boardId);
  //     let copyY = [...y];
  //     let orderedY = copyY.sort((a, b) => a - b);
  //     let rearrangedIndexes = [];
  //     orderedY.forEach((item) => rearrangedIndexes.push(y.indexOf(item)));
  //     submitedLetters[2].boardId = rearrangedIndexes.map(
  //       (i) => submitedLetters[2].boardId[i]
  //     );
  //     submitedLetters[1].player2 = rearrangedIndexes.map(
  //       (i) => submitedLetters[1].player2[i]
  //     );
  //     submitedLetters[1].playerId = rearrangedIndexes.map(
  //       (i) => submitedLetters[1].playerId[i]
  //     );
  //     return true;
  //   }
  // }

  // //function to rearrange array by row
  // function rearrangeColumnbyRow(player) {
  //   if (player) {
  //     let x = selectTheColumn(submitedLetters[2].boardId);
  //     let copyX = [...x];
  //     let orderedX = copyX.sort((a, b) => a - b);
  //     let rearrangedIndexes = [];
  //     orderedX.forEach((item) => rearrangedIndexes.push(x.indexOf(item)));
  //     submitedLetters[2].boardId = rearrangedIndexes.map(
  //       (i) => submitedLetters[2].boardId[i]
  //     );
  //     submitedLetters[0].player1 = rearrangedIndexes.map(
  //       (i) => submitedLetters[0].player1[i]
  //     );
  //     submitedLetters[0].playerId = rearrangedIndexes.map(
  //       (i) => submitedLetters[0].playerId[i]
  //     );
  //     return true;
  //   } else {
  //     let x = selectTheColumn(submitedLetters[2].boardId);
  //     let copyX = [...x];
  //     let orderedX = copyX.sort((a, b) => a - b);
  //     let rearrangedIndexes = [];
  //     orderedX.forEach((item) => rearrangedIndexes.push(x.indexOf(item)));
  //     submitedLetters[2].boardId = rearrangedIndexes.map(
  //       (i) => submitedLetters[2].boardId[i]
  //     );
  //     submitedLetters[1].player2 = rearrangedIndexes.map(
  //       (i) => submitedLetters[1].player2[i]
  //     );
  //     submitedLetters[1].playerId = rearrangedIndexes.map(
  //       (i) => submitedLetters[1].playerId[i]
  //     );
  //     return true;
  //   }
  // }

  //function to check if is allowed word
   async function wordChecker(word) {
    /* let isAllowed = $("#word").val(); */
    let wordCheck = $.ajax({url: `https://significado.herokuapp.com/${word}`, statusCode:  { 400: () =>  returnTilestoPlayersDeck(firstPlayerTurn.is)  } ,});
    wordCheck.done((data) => {
      console.log(data)
      if (!classesNaoPermitidas.includes(data[0].class) && data[0].meanings.length > 0) {
        
        allowedWord = true;
        console.log("check word")
        pushLetters( firstPlayerTurn.is);
        removeFromDeck();
        requestScores();
      }  else {
        returnTilestoPlayersDeck(firstPlayerTurn.is);
        changePlayer();
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
    });
  };

  boardCreator();

  //Depois passar todas estas funções para um arquivo separado
  //1. Função para começar o jogo: Depois de ter criado o avatar e ter apertado algum botão.
  //A função realiza dois fetchs, um para cada jogador, recebe as letras e as coloca no deck do jogador
  $("#requestButton").click(function requestFirstLetters() {
    const url = "http://localhost:3000/scrabble/drawletters/";
    let amount = 0;
    if (!firstMove) {
      //request the first 7 letters for player1
      $.get(/* url.drawletters */ url + "1/7", function (data) {
        receivedData[0].letters.push(data.letters);
        receivedData[0].values.push(data.values);
        receivedData[0].whichPlayer = "player1";
        let { letters, values, whichPlayer } = { ...receivedData[0] };
        lettersToPlayersDeck(letters, values, whichPlayer);
      });
      //request the first 7 letters for player2
      $.get(/* url.drawletters */ url + "2/7", function (data) {
        receivedData[1].letters.push(data.letters);
        receivedData[1].values.push(data.values);
        receivedData[1].whichPlayer = "player2";
        receivedData[2].lettersleft = data.lettersLeft;
        let { letters, values, whichPlayer } = { ...receivedData[1] };
        lettersToPlayersDeck(letters, values, whichPlayer);
      });
    } else {
      if(firstPlayerTurn.is) {
        console.log("first player");
        tilesPlayer1.forEach(tile =>{
          if(tile.letter === "") {
            amount++
          }
        });
        if (amount > 0) {
          $.get(/* url.drawletters */ url + "1/"+ amount, function (data) {
            console.log("player 1 new data: ",data);
            receivedData[0].letters.push(data.letters);
            receivedData[0].values.push(data.values);
            receivedData[0].whichPlayer = "player1";
            let { letters, values, whichPlayer } = { ...receivedData[0] };
            $("#deck0").empty();
            lettersToPlayersDeck(letters, values, whichPlayer);
          });
        }
        
      } else {
        console.log("Second player")
        tilesPlayer2.forEach(tile =>{
          if(tile.letter === "") {
            amount++
          }
        });
        if (amount > 0) {
          $.get(/* url.drawletters */ url + "2/"+ amount, function (data) {
            console.log("player 2 new data :", data)
            receivedData[1].letters.push(data.letters);
            receivedData[1].values.push(data.values);
            receivedData[1].whichPlayer = "player2";
            receivedData[2].lettersleft = data.lettersLeft;
            let { letters, values, whichPlayer } = { ...receivedData[1] };
            $("#deck1").empty();
            lettersToPlayersDeck(letters, values, whichPlayer);
          });
        }
      }
    }

    
    
  });

  $('#resetGame').on("click", function(){
    tilesPlayer1.forEach((tile) => {
      $(`#${tile.id}`).remove();
    });
    tilesPlayer2.forEach((tile) => {
      $(`#${tile.id}`).remove();
    });
    resetVariables();
    boardRecord = [];
    firstMove = false;
    firstPlayerTurn.is = true;
    $("#gameboard").html("");
    boardCreator()
    //delete players names
    $.get("http://localhost:3000/scrabble/reset",).done(ans => console.log(ans))
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
          console.log( validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection));
          if ( validateTheMove(submitedLetters[2].boardId, firstMove, submittedDirection)) {
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
          if ( validateTheMove( submitedLetters[2].boardId, firstMove, submittedDirection) ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId,1);
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
          if ( validateTheMove( submitedLetters[2].boardId,firstMove, submittedDirection) ) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId,1);
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
          if ( validateTheMove(submitedLetters[2].boardId,firstMove,submittedDirection )) {
            pushLettersToNewBoard(firstPlayerTurn.is);
            draft = verifyWordsOnBoard(submitedLetters[2].boardId,1);
            draft.forEach((array) => {
              word = array.join("");
              console.log(word);
              wordChecker(word);
            });

          }
        }
      } else if (submitedLetters[1].player2.length === 1){
        
        if ( isNextToATile(submitedLetters[2].boardId)) {
          console.log("validei")
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
        console.log("any tile placed")
      }
    }

    if (!firstMove) {
      firstMove = true;
    }


    allowedWord = false;
    
    
  });
});
