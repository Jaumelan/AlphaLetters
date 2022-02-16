$(document).ready(function() {
  const tripleWord = [ [0,0], [0,7], [0,14], [7,0], [7,14], [14,0], [14,7], [14,14] ];
  const doubleWord = [ [1,1], [2,2], [3,3], [4,4], [4,10], [7,7], [3,11], [2,12], [1,13], [13,1], [12,2], [11,3], [10,4], [10,10], [11,11], [12,12], [13,13]];
  const tripleLetter = [ [5,1], [1,5], [5,5], [9,1], [9,5], [13,5], [1,9], [5,9], [5,13], [9,9], [9,13], [13,9]];
  const doubleLetter = [ [3,0], [11,0], [0,3], [0,11], [6,2], [2,6], [7,3], [3,7], [8,2], [2,8], [6,6], [8,8], [6,8], [8,6], [14,3], [3,14], [6,12], [12,6], [11,7], [7,11], [12,8], [8,12], [14,11], [11,14]];
  
  
  function boardCreator() {
    for (let i = 0; i < 15; i++) {
      let newRow = $('<div class="row"></div>');
      for (let j = 0; j < 15; j++) {
          let newCell = $('<div class="cell"></div>');
          newCell.attr("row-number", i);
          newCell.attr("column-number", j);
          newCell.addClass("droppable")
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
  
  const classesNaoPermitidas = ["prefixo", "sufixo", ""];
  let palavraOK = true;
  $("#request").on("click", function () {
    const word = $("#word").val();
    $.ajax({url:`https://significado.herokuapp.com/${word}`})
      .done( data => {
        console.log(data);
        if(classesNaoPermitidas.includes(data[0].class)) {
          palavraOK = false;
        }
        /* if(palavraOK) {
          for (let i=)
          $("#meanings").cre

        } */
        console.log(palavraOK)
      })
  })
})
