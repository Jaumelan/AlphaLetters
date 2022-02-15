// function sendData() {
//   const word = document.getElementById("word").value;
//   fetch(`https://api.dicionario-aberto.net/near/${word}`)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

$(document).ready(function() {
  $("#request").on("click", function () {
    const word = $("#word").val();
    $.ajax({url:`https://api.dicionario-aberto.net/near/${word}`})
      .done( data => {
        console.log(data)
        })
  })
})