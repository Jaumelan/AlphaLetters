import { submitedLetters } from "./constants.js";
import { findDirection } from "./findDirection.js";
import { newBoard } from "./constants.js";

export function pushLettersToNewBoard(player) {
    console.log("moving letters");
    let x;
    let y;
    let letter;

    if (player) {
      for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
        x = Number(submitedLetters[2].boardId[i].positionx);
        y = Number(submitedLetters[2].boardId[i].positiony);
        newBoard[x][y] = `${submitedLetters[0].player1[i]}`;
      }
    } else {
      console.log("moving player2 letters");
      for (let i = 0; i < submitedLetters[2].boardId.length; i++) {
        x = Number(submitedLetters[2].boardId[i].positionx);
        y = Number(submitedLetters[2].boardId[i].positiony);
        newBoard[x][y] = `${submitedLetters[1].player2[i]}`;
      }
    }
    return true;
  }

export    function verifyWordsOnBoard(positions_placed, which_array) {
    let draft = [];
    let position = [];
    let amount_of_tiles = positions_placed.length;
    let first_x = Number(positions_placed[0].positionx);
    let first_y = Number(positions_placed[0].positiony);
    let last_x = Number(positions_placed[amount_of_tiles - 1].positionx);
    let last_y = Number(positions_placed[amount_of_tiles - 1].positiony);
    let diff_x = last_x - first_x;
    let diff_y = last_y - first_y;
    let drafts = [];
    let positions = [];
    let answer;

    if (amount_of_tiles > 1) {
      //is row or column?
      if (findDirection(positions_placed) === "row") {
        ///values in x still equal
        //try to find letters before my first y
        let j = 1;
        while (newBoard[first_x][first_y - j] !== "" ) {
          draft.unshift(newBoard[first_x][first_y - j]);
          position.unshift({posx:`${first_x}`,posy:`${first_y - j}`});
          j++;
        }
        //get the first letter
        draft.push(newBoard[first_x][first_y]);
        position.push({posx:`${first_x}`,posy:`${first_y}`})

        //try to fill the gaps if they are
        for (let index = 1; index < diff_y; index++) {
          draft.push(newBoard[first_x][first_y + index]);
          position.push({posx:`${first_x}`,posy:`${first_y + index}`});
        }
        //get the last letter
        draft.push(newBoard[last_x][last_y]);
        position.push({posx:`${last_x}`,posy:`${last_y}`});
        j = 1;
        //try to add letters at the end if exist
        while (newBoard[first_x][last_y + j] !== "") {
          draft.push(newBoard[first_x][last_y + j]);
          position.push({posx:`${first_x}`,posy:`${last_y + j}`});
          j++;
        }
      } else {
        let i = 1;
        while (newBoard[first_x - i][first_y] !== "") {
          draft.unshift(newBoard[first_x - i][first_y]);
          position.push({posx:`${first_x - i}`,posy:`${first_y}`});
          i++;
        }

        draft.push(newBoard[first_x][first_y]);
        position.push({posx:`${first_x}`,posy:`${first_y}`});

        for (let index = 1; index < diff_x; index++) {
          draft.push(newBoard[first_x + index][first_y]);
          position.push({posx:`${first_x + index}`,posy:`${first_y}`});
        }

        draft.push(newBoard[last_x][last_y]);
        position.push({posx:`${last_x}`,posy:`${last_y}`});
        i = 1;
        while (newBoard[last_x + i][last_y] !== "") {
          draft.push(newBoard[last_x + i][last_y]);
          position.push({posx:`${last_x + i}`,posy:`${last_y}`});
          i++;
        }
      }
      //for only one tile placed on board
    } else {
      let j = 1;
      while (newBoard[first_x][first_y - j] !== "") {
        draft.unshift(newBoard[first_x][first_y - j]);
        position.unshift({posx:`${first_x}`,posy:`${first_y - j}`});
        j++;
      }
      draft.push(newBoard[first_x][first_y]);
      position.push({posx:`${first_x}`,posy:`${first_y}`});
      j = 1;
      while (newBoard[first_x][last_y + j] !== "") {
        draft.push(newBoard[first_x][last_y + j]);
        position.push({posx:`${first_x}`,posy:`${last_y + j}`});
        j++;
      }

      if (draft.length < 2) {
        draft = [];
        position = [];
      } else {
        drafts.push(draft);
        positions.push(position)

      }
      draft = [];
      position = [];
      let i = 1;
      while (newBoard[first_x - i][first_y] !== "") {
        draft.unshift(newBoard[first_x - i][first_y]);
        position.unshift({posx:`${first_x - i}`,posy:`${first_y}`});
        i++;
      }

      draft.push(newBoard[first_x][first_y]);
      position.push({posx:`${first_x}`,posy:`${first_y}`});

      i = 1;
      while (newBoard[last_x + i][last_y] !== "") {
        draft.push(newBoard[last_x + i][last_y]);
        position.push({posx:`${last_x + i}`,posy:`${last_y}`});
        i++;
      }
      
    }
    
    if (draft.length < 2) {
      draft = [];
      position = [];
    } else {
      drafts.push(draft);
      positions.push(position);
    }
    if(which_array === 1) {
      answer = drafts;
    } else {
      answer = positions;
    }
    console.log("resposta :",answer);
    return answer;
  }
