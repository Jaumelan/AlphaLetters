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

  export function resetVariables() {
    console.log("reset variables", submitedLetters);
    submitedLetters[0].player1 = [];
    submitedLetters[0].playerId = [];
    submitedLetters[1].player2 = [];
    submitedLetters[1].playerId = [];
    submitedLetters[2].boardId = [];

    receivedData[0].letters = [];
    receivedData[0].values = [];
    receivedData[1].letters = [];
    receivedData[1].values = [];
    receivedData[2];
  };