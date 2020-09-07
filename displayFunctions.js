function resetBoard(rows, cols) {
  const board = getBoard(rows, cols);
  $('#grid').css('background-color', 'darkblue');

  return board;
}

function createToast(headerText, bodyText) {
  $('.toast-header').text(headerText);
  $('.toast-body').text(bodyText);
  $(document).ready(() => {
    $('.toast').toast('show');
  });
}

function winnerNotification(winner) {
  const player = winner === 'y' ? 'yellow' : 'red';
  createToast('Winner!', player + ' is the winner!')
}

function updateHTML(board, turnCount) {
  // update buttons with current player token
  for (let i = 0; i < cols; i++) {
    const buttonInnerText = turnCount % 2 === 0 ? '🟡' : '🔴';
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

