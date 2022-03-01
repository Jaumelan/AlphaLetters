  //function to push letters when the word is allowed
import { submitedLetters, boardRecord } from "./constants.js";
import { selectTheRow, selectTheColumn } from "./validateMove.js";

export function pushLetters(player) {
    console.log("moving letters");
    let xy = "";
    let letter = "";
    
    if (player) {
      for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
        xy = `${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`;
        letter = `${submitedLetters[0].player1[i]}`;
        boardRecord.push({xy,letter});
      }
      
    } else {
      for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
        xy = `${submitedLetters[2].boardId[i].positionx}${submitedLetters[2].boardId[i].positiony}`;
        letter = `${submitedLetters[1].player2[i]}`;
        boardRecord.push({xy,letter});
      }
    }
}
export function rearrangeRowbyColumn(player) {
    if (player) {
      let y = selectTheRow(submitedLetters[2].boardId);
      let copyY = [...y];
      let orderedY = copyY.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedY.forEach((item) => rearrangedIndexes.push(y.indexOf(item)));
      submitedLetters[2].boardId = rearrangedIndexes.map(
        (i) => submitedLetters[2].boardId[i]
      );
      submitedLetters[0].player1 = rearrangedIndexes.map(
        (i) => submitedLetters[0].player1[i]
      );
      submitedLetters[0].playerId = rearrangedIndexes.map(
        (i) => submitedLetters[0].playerId[i]
      );
      return true;
    } else {
      let y = selectTheRow(submitedLetters[2].boardId);
      let copyY = [...y];
      let orderedY = copyY.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedY.forEach((item) => rearrangedIndexes.push(y.indexOf(item)));
      submitedLetters[2].boardId = rearrangedIndexes.map(
        (i) => submitedLetters[2].boardId[i]
      );
      submitedLetters[1].player2 = rearrangedIndexes.map(
        (i) => submitedLetters[1].player2[i]
      );
      submitedLetters[1].playerId = rearrangedIndexes.map(
        (i) => submitedLetters[1].playerId[i]
      );
      return true;
    }
  }

  //function to rearrange array by row
  export function rearrangeColumnbyRow(player) {
    if (player) {
      let x = selectTheColumn(submitedLetters[2].boardId);
      let copyX = [...x];
      let orderedX = copyX.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedX.forEach((item) => rearrangedIndexes.push(x.indexOf(item)));
      submitedLetters[2].boardId = rearrangedIndexes.map(
        (i) => submitedLetters[2].boardId[i]
      );
      submitedLetters[0].player1 = rearrangedIndexes.map(
        (i) => submitedLetters[0].player1[i]
      );
      submitedLetters[0].playerId = rearrangedIndexes.map(
        (i) => submitedLetters[0].playerId[i]
      );
      return true;
    } else {
      let x = selectTheColumn(submitedLetters[2].boardId);
      let copyX = [...x];
      let orderedX = copyX.sort((a, b) => a - b);
      let rearrangedIndexes = [];
      orderedX.forEach((item) => rearrangedIndexes.push(x.indexOf(item)));
      submitedLetters[2].boardId = rearrangedIndexes.map(
        (i) => submitedLetters[2].boardId[i]
      );
      submitedLetters[1].player2 = rearrangedIndexes.map(
        (i) => submitedLetters[1].player2[i]
      );
      submitedLetters[1].playerId = rearrangedIndexes.map(
        (i) => submitedLetters[1].playerId[i]
      );
      return true;
    }
  }