const each = require('jest-each').default;
// eslint-disable-next-line no-global-assign
$ = require('jquery');

const { returnLastChar } = require('../src/backend/backendFunctions');
const fe = require('../src/frontend/frontendFunctions');

beforeEach(() => {
  jest.resetAllMocks();
  document.getElementsByTagName('html')[0].innerHTML = '';
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
  document.body.innerHTML = '<div id=\'score\'>';

  it('update the html contents', () => {
    fe.updatePlayerWinCount({
      score: 3,
    }, 'score');
    expect($('#test-area').text() === 3);
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
      expect($('.toast-body').text() === `${player} is the winner!`);
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

describe('returnLastChar function', () => {
  const string = 'abcd';
  it('should return last character of a string', () => {
    const output = returnLastChar(string);
    expect(output).toBe('d');
  });
});

describe('requestLogin function', () => {
  const spy = jest.spyOn($, 'ajax');

  it('called with the right data', () => {
    const body = {
      test: 'this data',
    };
    fe.requestLogin(body);
    expect(spy.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        method: 'POST',
        url: '/login',
        dataType: 'json',
      }),
    );
    expect(spy.mock.calls[0][0].data).toBe(JSON.stringify(body));
  });
});

describe('updateHTML function', () => {
  // Arrange

  // Act
  // Assert
});

test.todo('updateHTML function');
test.todo('loadHTML');
test.todo('bindModalEventListeners');
