export function findDirection(positions) {
    let x = [];
    let y = [];
    let direction = "not allowed";
    positions.forEach((item) => {
      x.push(item.positionx);
      y.push(item.positiony);
    });
    
    if (x.every((elem, i, arr) => elem === arr[0])) {
      direction = "row";
    } else if (y.every((elem, i, arr) => elem == arr[0])) {
      direction = "column";
    }
    return direction;
  }