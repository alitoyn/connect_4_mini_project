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

function updatePlayerWinCount(gameState, playerScoreKey) {
  $('#' + playerScoreKey)
    .text(gameState[playerScoreKey]);
}

function winnerNotification(winner) {
  const player = winner === 'y' ? 'yellow' : 'red';
  createToast('Winner!', player + ' is the winner!');
}

function updateHTML(gameState) {
  // update buttons with current player token
  for (let i = 0; i < gameState.cols; i++) {
    const buttonInnerText = gameState.turnCount % 2 === 0 ? '🟡' : '🔴';
    $(`#button${i}`).text(buttonInnerText);
  }

  // match the html board to the array
  for (let i = 0; i < gameState.rows; i++) {
    for (let j = 0; j < gameState.cols; j++) {
      if (gameState.board[i][j] === null) {
        $(`#row-${i}-column-${j}`).text('🟣');
      } else if (gameState.board[i][j] === 'y') {
        $(`#row-${i}-column-${j}`).text('🟡');
      } else {
        $(`#row-${i}-column-${j}`).text('🔴');
      }
    }
  }
}

function loadHTML() {
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

  // create row buttons and bind them
  for (let i = 0; i < gameState.cols; i++) {
    $('#button-row').append(
      $('<button />')
        .attr('id', 'button' + i)
        .addClass('col-1 btn btn-primary btn-lg')
        .click(buttonClick),
    );
  }

  // bind reset buttons
  $('#reset').click(buttonClick);

  // push board to html
  updateHTML(gameState);
}
