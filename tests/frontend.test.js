const each = require('jest-each').default;
// const { iterator } = require('core-js/fn/symbol');
// eslint-disable-next-line no-global-assign
$ = require('jquery');

const { createToast, updatePlayerWinCount } = require('../src/frontend/frontendFunctions');
const { frontend } = require('../src/frontend/frontendFunctions');

describe('createToast function', () => {
  // Arrange
  document.body.innerHTML = '<div id=\'toast-header\'>< div id=\'toast-body\'>';
  // Act
  createToast('header', 'body');
  // Assert
  it('update the html contents', () => {
    expect($('.toast-header').text() === 'header');
    expect($('.toast-body').text() === 'body');
  });
});
