const api = '';

$(() => {
  $('#exampleModal').modal({ backdrop: 'static', keyboard: false });

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
      requestLogin(body);
    });

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
          requestLogin(body);
        },
        error: () => {
          const body = {
            username: 'Joe Bloggs',
            password: '123',
          };
          requestLogin(body);
        },
      });
    });

  $('#reset-scores')
    .click(() => {
      $.ajax({
        url: '/reset-scores',
        dataType: 'json',
        success: (data) => {
          updateHTML(data);
        },
        error: (res) => {
          createToast('Reset Error', res.responseText.slice(1, -1));
        },
      });
    });
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
