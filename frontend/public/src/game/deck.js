import { receivedData,submitedLetters, tilesPlayer1, tilesPlayer2, firstPlayerTurn } from "./constants.js";
import { resetVariables } from "./resetVariables.js";
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

export function lettersToPlayersDeck(letters, values, player) {
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
  };


//function return tiles to player
export function returnTilestoPlayersDeck(player) {
    console.log("destroying");

    if (player) {
      console.log("primeiro jogador");
      tilesPlayer1.forEach((tile) => {
        $(`#${tile.id}`).remove();
      });
      let { letters, values, whichPlayer } = { ...receivedData[0] };
      lettersToPlayersDeck(letters, values, whichPlayer);
    } else {
      console.log("segundo jogador");
      tilesPlayer2.forEach((tile) => {
        $(`#${tile.id}`).remove();
      });
      let { letters, values, whichPlayer } = { ...receivedData[1] };
      lettersToPlayersDeck(letters, values, whichPlayer);
    }
  }

  //Function to remove played letters from player's hand
export function removeTiles(player) {
    console.log("removing ids")
    if(player) {
      console.log(submitedLetters)
      submitedLetters[0].playerId.forEach(subTile=>{
        tilesPlayer1.forEach( tile=> {
          if(tile.id === subTile) {
            tile.letter = "";
            tile.value = 0;
          }
        })
      })
      console.log(tilesPlayer1);
    } else {
      console.log(submitedLetters)
      submitedLetters[1].playerId.forEach(subTile=>{
        tilesPlayer2.forEach( tile=> {
          if(tile.id === subTile) {
            tile.letter = "";
            tile.value = 0;
          }
        })
      })
      console.log(tilesPlayer2);
    }
    resetVariables()
};

export function removeFromDeck() {
    console.log("removing ids");
    
    if (firstPlayerTurn.is) {
      submitedLetters[0].playerId.forEach(id => {
        $(`#${id}`).draggable("option", "disabled", true );
        $(`#${id}`).addClass("placed");
        /* $(`#${id}`).removeAttr("id"); */
      });
      console.log()
    } else {
      submitedLetters[1].playerId.forEach((id) => {
        $(`#${id}`).draggable("option", "disabled", true);
        $(`#${id}`).addClass("placed");
        /* $(`#${id}`).removeAttr("id"); */
      });
    }
}