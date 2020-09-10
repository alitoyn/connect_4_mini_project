const api = '';

function returnLastChar(string) {
  return string[string.length - 1];
}

// get initial game state
$.get(api + '/state', (data) => {
  loadHTML(data);
});

// event loop
function buttonClick(event) {
  const buttonId = event.target.id;

  if (buttonId === 'reset') {
    $.get(api + '/reset', (data) => {
      updateHTML(data);
    });
  } else {
    const selectedColumn = returnLastChar(buttonId);
    const send = {
      button: selectedColumn,
    };
    $.ajax({
      method: 'POST',
      url: api + '/move',
      success: (res) => { updateHTML(res); },
      error: (res) => {
        if (res.status === 406) {
          createToast('Move Error', res.responseText.slice(1, -1));
        }
      },
      dataType: 'json',
      data: JSON.stringify(send),
      contentType: 'application/json',
    });
  }
}
