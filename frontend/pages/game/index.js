$(document).ready(function() {

  const tripleWord = [ [0,0], [0,7], [0,14], [7,0], [7,14], [14,0], [14,7], [14,14] ];
  const doubleWord = [ [1,1], [2,2], [3,3], [4,4], [4,10], [7,7], [3,11], [2,12], [1,13], [13,1], [12,2], [11,3], [10,4], [10,10], [11,11], [12,12], [13,13]];
  const tripleLetter = [ [5,1], [1,5], [5,5], [9,1], [9,5], [13,5], [1,9], [5,9], [5,13], [9,9], [9,13], [13,9]];
  const doubleLetter = [ [3,0], [11,0], [0,3], [0,11], [6,2], [2,6], [7,3], [3,7], [8,2], [2,8], [6,6], [8,8], [6,8], [8,6], [14,3], [3,14], [6,12], [12,6], [11,7], [7,11], [12,8], [8,12], [14,11], [11,14]];
    
  const classesNaoPermitidas = ["prefixo", "sufixo", ""];
  let allowedWord = true;

  function boardCreator() {
    for (let i = 0; i < 15; i++) {
      let newRow = $('<div class="row"></div>');
      for (let j = 0; j < 15; j++) {
          let newCell = $('<div class="cell"></div>');
          newCell.attr("row-number", i);
          newCell.attr("column-number", j);
          newCell.attr("xy", `${i}-${j}`);
          newCell.addClass("droppable")
          $(".droppable").droppable({
            drop: function(event,ui) {
              let draggedID = ui.draggable.attr("id");
              let droppedPosition = $(this).attr("xy");
              console.log("Tile "+ draggedID + " dropped on " + droppedPosition);
              //console.log("dropped at row " + event.target.getAttribute("row-number") + " column " + event.target.getAttribute("column-number"))
            }
          })
          newRow.append(newCell);
          tripleWord.forEach(xy => {
            if(xy[0] === i && xy[1] === j) {
              newCell.addClass("tripleWord");
              newCell.html("TP");
            }
          });
          doubleWord.forEach(xy=> {
            if(xy[0] === i && xy[1] === j) {
              newCell.addClass("doubleWord");
              newCell.html("DP");
            }
          });
          tripleLetter.forEach(xy=> {
            if(xy[0] === i && xy[1] === j) {
              newCell.addClass("tripleLetter");
              newCell.html("TL");
            }
          });
          
          doubleLetter.forEach(xy=>{
            if(xy[0] === i && xy[1] === j) {
              newCell.addClass("doubleLetter");
              newCell.html("DL");
            }
          })
      }
      $('#gameboard').append(newRow);
    }
  }

  boardCreator();
  //programação do modal
  const avatars = Array.from(document.getElementsByClassName("avatars"));
  const avatarIDs = [ "avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6",];
  const avatarsTags = ["$('#avatar1')", "$('#avatar2')", "$('#avatar3')", "$('#avatar4')", "$('#avatar5')", "$('#avatar6')"];

  function modalhandler() {
    avatars.map(avatar => {
      avatar.addEventListener('click', (event) => {
        //aqui estava querendo mudar o fundo da tag figure que contém a img para mostrar que selecionou
        let parentID = event.target.parentNode.id;
        $(parentID).css('background-color','yellow');
        
      })
    })
  }

  //modalhandler()

  //record of letters of each player's deck
  const tilesPlayer1 = [
    {id: "deck0_piece0", letter: "", value: 0},
    {id: "deck0_piece1", letter: "", value: 0},
    {id: "deck0_piece2", letter: "", value: 0},
    {id: "deck0_piece3", letter: "", value: 0},
    {id: "deck0_piece4", letter: "", value: 0},
    {id: "deck0_piece5", letter: "", value: 0},
    {id: "deck0_piece6", letter: "", value: 0}
  ];
  const tilesPlayer2 = [
    {id: "deck1_piece0", letter: "", value: 0},
    {id: "deck1_piece1", letter: "", value: 0},
    {id: "deck1_piece2", letter: "", value: 0},
    {id: "deck1_piece3", letter: "", value: 0},
    {id: "deck1_piece4", letter: "", value: 0},
    {id: "deck1_piece5", letter: "", value: 0},
    {id: "deck1_piece6", letter: "", value: 0}
  ];
  //data received from get route drawletters
  const receivedData = [
    {letters: [], values:[], whichPlayer: "player1"},
    {letters: [], values:[], whichPlayer: "player2"},
    {lettersleft:0}
  ];
  const url = "http://localhost:3000/scrabble/drawletters/";
  let player1Turn = true;

  //Depois passar todas estas funções para um arquivo separado
  //1. Função para começar o jogo: Depois de ter criado o avatar e ter apertado algum botão.
  //A função realiza dois fetchs, um para cada jogador, recebe as letras e as coloca no deck do jogador
  $("#requestButton").click(function requestFirstLetters() {
    
    const url = "http://localhost:3000/scrabble/drawletters/";
    
    //request the first 7 letters for player1
    $.get(url+"1/7", function(data){
      receivedData[0].letters.push(data.letters);
      receivedData[0].values.push(data.values);
      receivedData[0].whichPlayer = "player1";
      let {letters,values,whichPlayer} = {...receivedData[0]} 
      lettersToPlayersDeck(letters, values, whichPlayer);
    })
    //request the first 7 letters for player2
    $.get(url+"2/7", function(data){
      receivedData[1].letters.push(data.letters);
      receivedData[1].values.push(data.values);
      receivedData[1].whichPlayer = "player2";
      receivedData[2].lettersleft = data.lettersLeft;
      let {letters,values,whichPlayer} = {...receivedData[1]};
      lettersToPlayersDeck(letters,values,whichPlayer);
      
    })
  })

  //2. Create a function to create each player's deck
  function createDeck(player) {
    if (player === "player1") {
      tilesPlayer1.forEach(tile =>{
        $("#deck0").append(`<div id="${tile.id}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`);
      });
    } else {
      tilesPlayer2.forEach(tile => {
        $("#deck1").append(`<div id="${tile.id}" class="pieceSmall">${tile.letter}<span class="piece-numberSmall">${tile.value}</span></div>`);
      })
    }
  }

  //function to check which tile is available from player's deck record and place the letter
  function lettersToPlayersDeck(letters,values,player) {
    let i = 0;
    
    if (player === "player1") {
      tilesPlayer1.forEach(tile => {
        if(tile.letter === "") {
          tile.letter = letters[0][i];
          tile.value = values[0][i];
          i++
        }
      })
    } else {
      tilesPlayer2.forEach(tile => {
        if(tile.letter === "") {
          tile.letter = letters[0][i];
          tile.value = values[0][i];
          i++
        }
      })
    }
    createDeck(player);
  }
  console.log(player1Turn)
  //function to handle vez, and let player drag tiles to the board
  $("#playButton").click(function(player1Turn){
    console.log(player1Turn);
    if(player1Turn) {
      tilesPlayer1.forEach(tile => $(`#${tile.id}`).draggable() );
    } else {
      tilesPlayer2.forEach(tile => $(`#${tile.id}`).draggable() );
    }
    player1Turn = false;
  })

  //function to handle drop events
  

  //function to check if is allowed word
  function wordCheck(word) {
    /* let isAllowed = $("#word").val(); */
    $.ajax({url:`https://significado.herokuapp.com/${word}`})
      .done( data => {
        console.log(data);
        if(classesNaoPermitidas.includes(data[0].class)) {
          allowedWord = false;
        }
        //colocar o significado (só teste)
        if(allowedWord) {
          $("#meanings").html("")
          for (let i=0; i <= data[0].meanings.length; i++) {
            let p = $("<p></p>");
            p.text(data[0].meanings[i]);
            $("#meanings").append(p)
          }
        }
        console.log(allowedWord)
      })
  }
  
})
