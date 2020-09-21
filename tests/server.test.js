const each = require('jest-each').default;
const { TestScheduler } = require('jest');

const supertest = require('supertest');
const fs = require('fs').promises;
const mock = require('mock-fs');

const { app } = require('../src/backend/server');

const request = supertest(app);

// eslint-disable-next-line import/no-extraneous-dependencies
require('iconv-lite').encodingExists('foo');

const dataObject = [{
  username: 'coolusername123',
  password: '123',
  token: 'RandomToken',
  gameData: [{
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'fullColumnTest',
  password: '123',
  token: 'fullColumnTest_token',
  gameData: [{
    board: [['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
},
{
  username: 'lastTurnTest',
  password: '123',
  token: 'lastTurnTest_token',
  gameData: [{
    board: [['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow']],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  }],
}];

beforeEach(() => {
  mock({
    './src/backend/': {
      'secrets.json': JSON.stringify(dataObject),
    },
    './src/frontend/': {
      'index.html': JSON.stringify('<html></html>'),
    },
  });
});

afterEach(() => {
  mock.restore();
});

describe('/', () => {
  it('returns a html file', async (done) => {
    await request.get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8');
    done();
  });
  it('returns a 200 success code', async (done) => {
    await request.get('/')
      .expect(200);
    done();
  });
});

describe('/info', () => {
  it('returns 200 success when called', async (done) => {
    await request.get('/info')
      .expect(200);
    done();
  });
  it('returns a json file', async (done) => {
    await request.get('/info')
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });
  it('returns the correct message', async (done) => {
    await request.get('/info')
      .expect('"Welcome to connect 4. please read the docs to find the right endpoints"');
    done();
  });
});

describe('/reset', () => {
  it('returns 200', async (done) => {
    await request.get('/reset')
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    await request.get('/reset')
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  test.todo('check the body content returned is correct');
  test.todo('refactor reset for no matching token and test');
});

describe('/reset-scores', () => {
  it('returns 200', async (done) => {
    await request.get('/reset-scores')
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    await request.get('/reset-scores')
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });
});

describe('/move', () => {
  const body = {
    button: '0',
  };

  it('returns 200 for correct move', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json for correct move', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns error 400 if board is full', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=lastTurnTest_token'])
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns correct message for a full board', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=lastTurnTest_token'])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('"The game is a draw"');
    done();
  });

  it('returns correct error for full column', async (done) => {
    await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=fullColumnTest_token'])
      .expect('"The selected column is full"');
    done();
  });

  test.todo('different move errors');
});

describe('/login', () => {
  const bodyNewUser = {
    username: 'otherCoolUsername',
    password: 'password123',
  };

  const bodyExistingUser = {
    username: 'coolusername123',
    password: '123',
  };

  const dataExistingUser = {
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'coolusername123',
    rows: 6,
    cols: 7,
    turnCount: 16,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  };

  const dataNewUser = {
    board: [[null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]],
    name: 'otherCoolUsername',
    rows: 6,
    cols: 7,
    turnCount: 0,
    winner: false,
    draw: false,
    winCondition: 4,
    player1Score: 0,
    player2Score: 0,
  };

  it('returns 200 for an existing user', async (done) => {
    await request
      .post('/login')
      .send(bodyExistingUser)
      .expect(200);
    done();
  });

  it('returns a json for an existing user', async (done) => {
    await request
      .post('/login')
      .send(bodyExistingUser)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns the correct body data for an existing user', async (done) => {
    await request
      .post('/login')
      .send(bodyExistingUser)
      .expect(dataExistingUser);
    done();
  });

  it('returns 200 for new user', async (done) => {
    await request
      .post('/login')
      .send(bodyNewUser)
      .expect(200);
    done();
  });

  it('returns a json for new user', async (done) => {
    await request
      .post('/login')
      .send(bodyNewUser)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns the correct body data for new user', async (done) => {
    await request
      .post('/login')
      .send(bodyNewUser)
      .expect(dataNewUser);
    done();
  });

  it('returns 401 with incorrect password', async (done) => {
    await request
      .post('/login')
      .send({
        username: 'coolusername123',
        password: 'incorrect',
      })
      .expect(401);
    done();
  });

  it('returns correct message for incorrect password', async (done) => {
    await request
      .post('/login')
      .send({
        username: 'coolusername123',
        password: 'incorrect',
      })
      .expect('"incorrect password"');
    done();
  });

  test.todo('login errors');
});

describe('hit an invalid endpoint', () => {
  it('return 404 error', async (done) => {
    await request
      .get('/non-existent-endpoint')
      .expect(404)
      .expect('Content-Type', 'text/html; charset=utf-8');
    done();
  });
});
