// function sendData() {
//   const word = document.getElementById("word").value;
//   fetch(`https://api.dicionario-aberto.net/near/${word}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

$(document).ready(function() {
  function boardCreator() {
    for (let i = 0; i < 15; i++) {
      let newRow = $('<div class="row"></div>');
      for (let j = 0; j < 15; j++) {
          let newCell = $('<div class="cell"></div>');
          newCell.attr("row-number", i);
          newCell.attr("column-number", j);
          newRow.append(newCell);
      }
      $('#gameboard').append(newRow);
    }
  }
  boardCreator();
  
  $("#request").on("click", function () {
    const word = $("#word").val();
    $.ajax({url:`https://api.dicionario-aberto.net/near/${word}`})
      .done( data => {
        console.log(data)
        })
  })
})