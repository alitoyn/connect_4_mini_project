function resetBoard(rows, cols) {
  const board = getBoard(rows, cols);
  $('#grid').css('background-color', 'darkblue');

  return board;
}
