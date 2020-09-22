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

function getPlayerScoreKey(winner) {
  return winner === 'y' ? 'player1Score' : 'player2Score';
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

  // update win counts
  updatePlayerWinCount(gameState, 'player1Score');
  updatePlayerWinCount(gameState, 'player2Score');

  // create toast if the game has finished
  if (gameState.winner === true) { // if the winner flag as not been reset, don't change anything
    createToast('Game Over', 'Please press reset to continue...');
  } else if (gameState.draw === true) {
    createToast('Draw', 'Please press reset to start again...');
  }
}

function loadHTML(gameState) {
  // grid initialiser
  for (let i = 0; i < gameState.rows; i++) {
    elementIDRow = 'row-' + i;

    $('#nameHeading').text('Welcome ' + gameState.name + '!');

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

  $('#reset-scores')
    .click(() => {
      $.ajax({
        url: '/reset-scores',
        dataType: 'json',
        success: (data) => {
          updateHTML(data);
        },
        error: (res) => {
          createToast('Reset Error', res.responseText.slice(1, -1));
        },
      });
    });

  // push board to html
  updateHTML(gameState);
}

function requestReset() {
  $.get('/reset', (data) => {
    updateHTML(data);
  });
}

function requestPlaceToken(selectedColumn) {
  const body = {
    button: selectedColumn,
  };
  $.ajax({
    method: 'POST',
    url: api + '/move',
    dataType: 'json',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (res) => { updateHTML(res); },
    error: (res) => {
      if (res.status === 406) {
        createToast('Move Error', res.responseText.slice(1, -1));
      }
    },
  });
}

function returnLastChar(string) {
  return string[string.length - 1];
}

function requestLogin(body) {
  $.ajax({
    method: 'POST',
    url: api + '/login',
    dataType: 'json',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: async (res) => {
      loadHTML(res);
      $('#modal').modal('hide');
    },
    error: (res) => {
      $('#error-message').css('display', 'inline');
    },
  });
}

function bindModalEventListeners() {
  $('#password').keypress((event) => {
    if (event.keyCode === 13) {
      $('#submit-button').click();
    }
  });

  $('#submit-button')
    .click(() => {
      const user = $('#username').val();
      const pass = $('#password').val();
      const body = {
        username: user,
        password: pass,
      };
      requestLogin(body);
    });

  $('#guest-button')
    .click(() => {
      $.ajax({
        url: 'https://randomuser.me/api/?inc=name',
        dataType: 'json',
        success: (data) => {
          const user = data.results[0].name.first + ' ' + data.results[0].name.last;
          const pass = '123';
          const body = {
            username: user,
            password: pass,
          };
          requestLogin(body);
        },
        error: () => {
          const body = {
            username: 'Joe Bloggs',
            password: '123',
          };
          requestLogin(body);
        },
      });
    });
}

if (typeof module !== 'undefined') {
  module.exports = {
    createToast,
    updatePlayerWinCount,
    winnerNotification,
    getPlayerScoreKey,
    requestReset,
  };
}
