const api = '';

function returnLastChar(string) {
  return string[string.length - 1];
}

let gameState = {};

// get inital game state
$.get(api + '/state', (data, textStatus, jqXHR) => {
  gameState = data;
  loadHTML(gameState);
});

// event loop
function buttonClick(event) {
  const buttonId = event.target.id;

  if (buttonId === 'reset') {
    //  request reset from API
    updateHTML(gameState);
  } else {
    if (gameState.winner === true) { // if the winner flag as not been reset, don't change anything
      createToast('Game Over', 'Please press reset to continue...');
      return;
    }
    const selectedColumn = returnLastChar(buttonId);
    console.log(selectedColumn);

    const send = {
      button: selectedColumn,
    };
    const request = {
      method: 'POST',
      url: api + '/move',
      success: (res) => { updateHTML(res); },
      error: (res) => { console.log(res); },
      dataType: 'json',
      data: JSON.stringify(send),
      contentType: 'application/json',
    };

    $.ajax(request);
    
    // const selectedRow = getFirstEmptyRow(gameState.board, selectedColumn);
    // if (selectedRow !== null) {
    //   gameState.board[selectedRow][selectedColumn] = gameState.turnCount % 2 === 0.0 ? 'y' : 'r';
    //   gameState.turnCount++;
    //   updateHTML(gameState);
    //   gameState.winner = checkWinner(selectedRow, selectedColumn,
    //     gameState.board, gameState.winCondition);
    //   if (gameState.winner) {
    //     const playerScoreKey = getPlayerScoreKey(gameState,
    //       gameState.board[selectedRow][selectedColumn]);
    //     gameState[playerScoreKey] = increasePlayerScore(gameState, playerScoreKey);
    //     winnerNotification(gameState.board[selectedRow][selectedColumn]);
    //     updatePlayerWinCount(gameState, playerScoreKey);
    //   }
    // } else {
    //   createToast('Column Full', 'Select a different one or reset the game');
    // }
  }
  console.log('button');
}
