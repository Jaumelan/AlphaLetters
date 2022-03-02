export const submitedLetters = [
    { player1: [], playerId: [] },
    { player2: [], playerId: [] },
    { boardId: [] },
  ];
  //data received from get route drawletters
  export const receivedData = [
    { letters: [], values: [], whichPlayer: "player1" },
    { letters: [], values: [], whichPlayer: "player2" },
    { lettersleft: 0 },
  ];

export const tripleWord = [ [0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14] ];
export const doubleWord = [ [1, 1], [2, 2], [3, 3], [4, 4], [4, 10], [7, 7], [3, 11], [2, 12], [1, 13], [13, 1], [12, 2], [11, 3], [10, 4], [10, 10], [11, 11], [12, 12], [13, 13] ];
export const tripleLetter = [ [5, 1], [1, 5], [5, 5], [9, 1], [9, 5], [13, 5], [1, 9], [5, 9], [5, 13], [9, 9], [9, 13], [13, 9] ];
export const doubleLetter = [[3, 0],[11, 0],[0, 3],[0, 11],[6, 2],[2, 6],[7, 3],[3, 7],[8, 2],[2, 8],[6, 6],[8, 8],[6, 8],[8, 6],[14, 3],[3, 14],[6, 12],[12, 6],[11, 7],[7, 11],[12, 8],[8, 12],[14, 11],[11, 14] ];
export const firstPlayerTurn = { is: true };
export let passTurnCounter = 0;

export let newBoard = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
];

export const classesNaoPermitidas = ["prefixo", "sufixo"];
export const nicknames = { player1: "Papagaio", player2: "Anta" };
export const tilesPlayer1 = [
  { id: "deck0_piece0", letter: "", value: 0 },
  { id: "deck0_piece1", letter: "", value: 0 },
  { id: "deck0_piece2", letter: "", value: 0 },
  { id: "deck0_piece3", letter: "", value: 0 },
  { id: "deck0_piece4", letter: "", value: 0 },
  { id: "deck0_piece5", letter: "", value: 0 },
  { id: "deck0_piece6", letter: "", value: 0 },
];

export const tilesPlayer2 = [
  { id: "deck1_piece0", letter: "", value: 0 },
  { id: "deck1_piece1", letter: "", value: 0 },
  { id: "deck1_piece2", letter: "", value: 0 },
  { id: "deck1_piece3", letter: "", value: 0 },
  { id: "deck1_piece4", letter: "", value: 0 },
  { id: "deck1_piece5", letter: "", value: 0 },
  { id: "deck1_piece6", letter: "", value: 0 },
];
export let droppedID = [];
export let boardRecord = [/* { xy: "88", letter: "M" } */];

