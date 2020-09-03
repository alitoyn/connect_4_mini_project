function resetBoard(rows, cols) {
  const board = getBoard(rows, cols);
  $('#grid').css('background-color', 'darkblue');

  return board;
}

function winnerNotification(winner) {
  const player = winner === 'y' ? 'yellow' : 'red';
  $('#grid').css('background-color', player);
}

function updateHTML(board) {
  // update buttons with current player token
  for (let i = 0; i < cols; i++) {
    const buttonInnerText = playerCount % 2 === 0 ? '🟡' : '🔴';
    $(`#button${i}`).text(buttonInnerText);
  }

  // match the html board to the array
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === null) {
        $(`#row-${i}-column-${j}`).text('🟣');
      } else if (board[i][j] === 'y') {
        $(`#row-${i}-column-${j}`).text('🟡');
      } else {
        $(`#row-${i}-column-${j}`).text('🔴');
      }
    }
  }
}
