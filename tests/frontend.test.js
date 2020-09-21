const each = require('jest-each').default;
// const { iterator } = require('core-js/fn/symbol');
// eslint-disable-next-line no-global-assign
$ = require('jquery');

const fe = require('../src/frontend/frontendFunctions');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('createToast function', () => {
  // Arrange
  document.body.innerHTML = '<div id=\'toast-header\'>< div id=\'toast-body\'>';
  // Act
  fe.createToast('header', 'body');
  // Assert
  it('update the html contents', () => {
    expect($('.toast-header').text() === 'header');
    expect($('.toast-body').text() === 'body');
  });
});

describe('updatePlayerWinCount function', () => {
  // Arrange
  document.body.innerHTML = '<div id=\'test-area\'>';

  // Act
  fe.updatePlayerWinCount({
    score: 0,
  }, 'score');

  // Assert
  it('update the html contents', () => {
    expect($('#test-area').text() === 0);
  });
});

describe('winnerNotification function', () => {
  document.body.innerHTML = '<div id=\'toast-header\'>< div id=\'toast-body\'>';
  each([['is called with yellow', 'y']])
    .it('%s', (text, passedPlayer) => {
      // eslint-disable-next-line global-require
      fe.winnerNotification(passedPlayer);
      expect($('.toast-header').text() === 'Winner!');
      const player = passedPlayer === 'y' ? 'yellow' : 'red';
      expect($('.toast-body').text() === player + ' is the winner!');
    });
});
