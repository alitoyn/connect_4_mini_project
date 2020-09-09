const api = '';

function returnLastChar(string) {
  return string[string.length - 1];
}

// get inital game state
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
    $.get(api + '/state', (gameState) => {
      if (gameState.winner === true) {
        return;
      }
      const selectedColumn = returnLastChar(buttonId);
      console.log(selectedColumn);

      const send = {
        button: selectedColumn,
      };
      $.ajax({
        method: 'POST',
        url: api + '/move',
        success: (res) => { updateHTML(res); },
        error: (res) => { console.log(res); },
        dataType: 'json',
        data: JSON.stringify(send),
        contentType: 'application/json',
      });
    });}
  console.log('button');
}
