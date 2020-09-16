const api = '';

$(() => {
  $('#exampleModal').modal({ backdrop: 'static', keyboard: false });

  bindModalEventListeners();
});

// event loop
function buttonClick(event) {
  const buttonId = event.target.id;

  if (buttonId === 'reset') {
    requestReset();
  } else {
    const selectedColumn = returnLastChar(buttonId);
    requestPlaceToken(selectedColumn);
  }
}
