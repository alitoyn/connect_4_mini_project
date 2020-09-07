const rows = 6;
const cols = 7;
const connectN = 4;
let turnCount = 0;
let winner = false;

// grid initialiser
for (let i = 0; i < rows; i++) {
  elementIDRow = 'row-' + i;

  $('#grid').prepend(
    $('<div></div>')
      .addClass('row')
      .attr('id', elementIDRow),
  );

  for (let j = 0; j < cols; j++) {
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
let board = getBoard(rows, cols);

// event loop
function buttonClick(event) {
  const buttonId = event.target.id;
  if (buttonId === 'reset') {
    board = resetBoard(rows, cols);
    updateHTML(board);
    winner = false;
  } else {
    if (winner === true) { // if the winner flag as not been reset, don't change anything
      createToast('Game Over', 'Please press reset to continue...');
      return;
    }
    const selectedColumn = returnLastChar(button);
    for (let i = 0; i < rows; i++) {
      if (board[i][selectedColumn] === null) { // if the selected cell is empty
        // put the right token in the cell
        board[i][selectedColumn] = turnCount % 2 === 0.0 ? 'y' : 'r';
        turnCount++;
        // update the board
        updateHTML(board);
        winner = checkWinner(i, selectedColumn, board, connectN);
        if (winner) {
          winnerNotification(board[i][selectedColumn]);
        }
        break;
      }
    }
  }
}

// create row buttons and bind them
for (let i = 0; i < cols; i++) {
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
updateHTML(board, turnCount);
