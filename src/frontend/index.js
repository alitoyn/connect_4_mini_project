/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  $('#modal').modal({ backdrop: 'static', keyboard: false });
  bindModalEventListeners();
});

// refresh loop
setInterval(() => {
  if ($('#nameHeading').text() !== ' Welcome back! ') {
    $.ajax({
      method: 'GET',
      url: '/update-board',
      dataType: 'json',
      contentType: 'application/json',
      success: async (res) => {
        updateHTML(res);
      },
      error: () => {
        createToast('Refresh Error', res.responseText.slice(1, -1));
      },
    });
  }
}, 500);

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
