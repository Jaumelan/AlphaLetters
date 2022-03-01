import { findDirection } from "./findDirection.js";
import {boardRecord} from "./constants.js";

export function validateTheMove(boardPositions, secondMove, direction) {
    const allowedDirections = ["row", "column"];
    let valid = false;
    let same_value;
    let different_values;
    let copy;
    let diff;
    let center = false;
       

    if (!secondMove) {
      let gapsExist = false;
      // is it the center?
      boardPositions.forEach( position => {
        if (position.positionx === "7" && position.positiony === "7") {
          center = true;
        }
      });
      //check if has only one tile
      if (boardPositions.length === 1) {
        if (center) {
          valid = true;
        }
      } else if ( allowedDirections.includes(direction) ) {
        if (direction === "row") {
          same_value = boardPositions[0].positionx;
          different_values = selectTheRow(boardPositions);
          copy = [...different_values];
          copy.map((value) => Number(value));
          for (let i = 0; i < copy.length; i++) {
            diff = copy[i + 1] - copy[i];
            if (diff > 1) {
              gapsExist = true;
            }
          }
        } else if (direction === "column") {
          same_value = boardPositions[0].positiony;
          different_values = selectTheColumn(boardPositions);
          copy = [...different_values];
          copy.map((value) => Number(value));
          for (let i = 0; i < copy.length; i++) {
            diff = copy[i + 1] - copy[i];
            if (diff > 1) {
              gapsExist = true;
            }
          }
        }
      }
      if (!gapsExist) {
        valid = true;
      }
    } else if (boardPositions.length === 1) {
      if (isNextToATile(boardPositions)) {
        valid = true;
      }
    } else if (allowedDirections.includes(direction)) {
      //if isn't the first move, then check if is in row or column direction

      //check if is next to a tile in the board
      if (isNextToATile(boardPositions)) {

        valid = true;
      }
    }
    
      return valid;
  }
  
  //function to check if the tiles are next to any placed tile on the board
  export function isNextToATile(tiles_positions) {
    
    let answer = false;
    let condition = "";
    console.log(boardRecord);
    boardRecord.forEach( boardPosition => {
      
      tiles_positions.forEach(tile_position => {
        let xUp = Number(tile_position.positionx) - 1;
        let xDown = Number(tile_position.positionx) + 1;
        let yLeft = Number(tile_position.positiony) - 1;
        let yRight = Number(tile_position.positiony) + 1;
        let nextPositions = [xUp, xDown, yLeft, yRight];
        let positions = [
          `${nextPositions[0]}${tile_position.positiony}`,
          `${nextPositions[1]}${tile_position.positiony}`,
          `${tile_position.positionx}${nextPositions[2]}`,
          `${tile_position.positionx}${nextPositions[3]}`,
          
        ];
        console.log("positions ", positions, "boardposition.xy", boardPosition.xy);
        if (boardPosition.xy === `${tile_position.positionx}${tile_position.positiony}`) {
          //the player has placed over a tile <-----------------------------------------------
          condition = "over";
        } else if (positions.includes(boardPosition.xy)) {
          condition = "next";
        }
      });
    });
    if (condition === "next") {
      answer = true;
    }
    
    console.log("next to a tile ",answer);
    return answer;
  };

  //function to find gap between letters
  export function getGaps(placed_positions) {
    let gaps = [];
    let diff = 0;
    let xy;
    let gap_value;
    let rowNumber;
    let y_values;
    let copy_y;

    //check if is row or columns
    if (findDirection(placed_positions) === "row") {
      rowNumber = placed_positions[0].positionx;
      //then get the column values
      let y_values = selectTheRow(placed_positions);
      copy_y = [...y_values];
      copy_y = copy_y.map((value) => Number(value));

      for (let i = 0; i < copy_y.length; i++) {
        diff = copy_y[i + 1] - copy_y[i];
        if (diff > 1) {
          for (let j = 1; j < diff; j++) {
            gap_value = copy_y[i] + j;
            xy = `${rowNumber}${gap_value}`;
            gaps.push(xy);
          }
        }
      }
    } else {
      let columnNumber = placed_positions[0].positiony;
      //get the row values
      let x_values = selectTheColumn(placed_positions);
      let copy_x = [...x_values];
      copy_x = copy_x.map((value) => Number(value));
      for (let i = 0; i < copy_x.length; i++) {
        diff = copy_x[i + 1] - copy_x[i];
        if (diff > 1) {
          for (let j = 1; j < diff; j++) {
            gap_value = copy_x[i] + j;
            xy = `${gap_value}${columnNumber}`;
            gaps.push(xy);
          }
        }
      }
    }

    return gaps;
  }
export function selectTheRow(ids) {
    let query = [];
    ids.forEach((id) => query.push(id.positiony));

    return query;
  }
  export function selectTheColumn(ids) {
    let query = [];
    ids.forEach((id) => query.push(id.positionx));
    return query;
  }
 