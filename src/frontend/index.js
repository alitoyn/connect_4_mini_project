const api = '';

$(() => {
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
      $.ajax({
        method: 'POST',
        url: api + '/login',
        dataType: 'json',
        data: JSON.stringify(body),
        contentType: 'application/json',
        success: async (res) => {
          loadHTML(res);
          $('#exampleModal').modal('hide');
        },
        error: (res) => {
          $('#error-message').css('display', 'inline');
        },
      });
    });
  $('#exampleModal').modal({ backdrop: 'static', keyboard: false });

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
          $.ajax({
            method: 'POST',
            url: api + '/login',
            dataType: 'json',
            data: JSON.stringify(body),
            contentType: 'application/json',
            success: async (res) => {
              loadHTML(res);
              $('#exampleModal').modal('hide');
            },
            error: (res) => {
              $('#error-message').css('display', 'inline');
            },
          });
        },
      });
    });
  $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
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
