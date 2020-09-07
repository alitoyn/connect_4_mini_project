const gameState = {
  board: [],
  rows: 6,
  cols: 7,
  turnCount: 0,
  winner: false,
  winCondition: 4,
};

// grid initialiser
for (let i = 0; i < gameState.rows; i++) {
  elementIDRow = 'row-' + i;

  $('#grid').prepend(
    $('<div></div>')
      .addClass('row')
      .attr('id', elementIDRow),
  );

  for (let j = 0; j < gameState.cols; j++) {
    elementIDCol = 'row-' + i + '-column-' + j;
    $('#' + elementIDRow).append(
      $('<div></div>')
        .addClass('col-1')
        .attr('id', elementIDCol),
    );
  }
}

// create global board variable
// needs to be redefined when reset
// eslint-disable-next-line prefer-const
gameState.board = getBoard(gameState.rows, gameState.cols);

// event loop
function buttonClick(event) {
  const buttonId = event.target.id;
  if (buttonId === 'reset') {
    gameState.board = resetBoard(gameState.rows, gameState.cols);
    updateHTML(gameState);
    winner = false;
  } else {
    if (gameState.winner === true) { // if the winner flag as not been reset, don't change anything
      createToast('Game Over', 'Please press reset to continue...');
      return;
    }
    const selectedColumn = returnLastChar(buttonId);
    const selectedRow = getFirstEmptyRow(gameState.board, selectedColumn);
    if (selectedRow !== null) {
      gameState.board[selectedRow][selectedColumn] = gameState.turnCount % 2 === 0.0 ? 'y' : 'r';
      gameState.turnCount++;
      updateHTML(gameState);
      gameState.winner = checkWinner(selectedRow, selectedColumn,
        gameState.board, gameState.winCondition);
      if (gameState.winner) {
        winnerNotification(gameState.board[selectedRow][selectedColumn]);
      }
    }
  }
}

// create row buttons and bind them
for (let i = 0; i < gameState.cols; i++) {
  $('#button-row').append(
    $('<button />')
      .attr('id', 'button' + i)
      .addClass('btn btn-primary btn-lg')
      .click(buttonClick),
  );
}

// bind reset buttons
$('#reset').click(buttonClick);

// push board to html
updateHTML(gameState);
