const api = '';

let gameState = {};

// get inital game state
$.get(api + '/state', (data, textStatus, jqXHR) => {
  gameState = data;
  $(document).ready(loadHTML);
});


// event loop
function buttonClick(event) {
//   const buttonId = event.target.id;
//   if (buttonId === 'reset') {
    
  //     gameState.board = resetBoard(gameState.rows, gameState.cols);
  //     updateHTML(gameState);
  //     gameState.winner = false;
  //   } else {
  //     if (gameState.winner === true) { // if the winner flag as not been reset, don't change anything
  //       createToast('Game Over', 'Please press reset to continue...');
  //       return;
  //     }
  //     const selectedColumn = returnLastChar(buttonId);
  //     const selectedRow = getFirstEmptyRow(gameState.board, selectedColumn);
  //     if (selectedRow !== null) {
  //       gameState.board[selectedRow][selectedColumn] = gameState.turnCount % 2 === 0.0 ? 'y' : 'r';
  //       gameState.turnCount++;
  //       updateHTML(gameState);
  //       gameState.winner = checkWinner(selectedRow, selectedColumn,
  //         gameState.board, gameState.winCondition);
  //       if (gameState.winner) {
  //         const playerScoreKey = getPlayerScoreKey(gameState,
  //           gameState.board[selectedRow][selectedColumn]);
  //         gameState[playerScoreKey] = increasePlayerScore(gameState, playerScoreKey);
  //         winnerNotification(gameState.board[selectedRow][selectedColumn]);
  //         updatePlayerWinCount(gameState, playerScoreKey);
  //       }
  //     } else {
  //       createToast('Column Full', 'Select a different one or reset the game');
  //     }
  //   }
  console.log('button');
}
