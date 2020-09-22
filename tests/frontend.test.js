const each = require('jest-each').default;
// const { iterator } = require('core-js/fn/symbol');
// eslint-disable-next-line no-global-assign
$ = require('jquery');

const FileSystem = require('mock-fs/lib/filesystem');
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
  each([['is called with yellow', 'y'],
    ['is called with red', 'r']])
    .it('%s', (text, passedPlayer) => {
      fe.winnerNotification(passedPlayer);
      expect($('.toast-header').text() === 'Winner!');
      const player = passedPlayer === 'y' ? 'yellow' : 'red';
      expect($('.toast-body').text() === player + ' is the winner!');
    });
});

describe('getPlayerScoreKey function', () => {
  each([['is called with yellow', 'y', 'player1Score'],
    ['is called with red', 'r', 'player2Score'],
  ])
    .it('%s', (text, winner, expected) => {
      const test = fe.getPlayerScoreKey(winner);
      expect(test).toBe(expected);
    });
});

describe('requestReset function', () => {
  const spy = jest.spyOn($, 'get');

  it('should be called once with the correct endpoint', () => {
    fe.requestReset();
    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe('/reset');
  });
});

describe('requestPlaceToken function', () => {
  const spy = jest.spyOn($, 'ajax');

  it('called with the right data', () => {
    const button = 3;
    fe.requestPlaceToken(button);
    expect(spy.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        method: 'POST',
        url: '/move',
        dataType: 'json',
      }),
    );
    expect(spy.mock.calls[0][0].data).toBe(JSON.stringify({ button }));
  });
});

// selenium tests
test.todo('updateHTML function');
test.todo('loadHTML');
