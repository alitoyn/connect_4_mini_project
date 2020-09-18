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
    const response = await request.get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8');
    done();
  });
  it('returns a 200 success code', async (done) => {
    const response = await request.get('/')
      .expect(200);
    done();
  });
});

describe('/info', () => {
  it('returns 200 success when called', async (done) => {
    const response = await request.get('/info')
      .expect(200);
    done();
  });
  it('returns a json file', async (done) => {
    const response = await request.get('/info')
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });
  it('returns the correct message', async (done) => {
    const response = await request.get('/info')
      .expect('"Welcome to connect 4. please read the docs to find the right endpoints"');
    done();
  });
});

describe('/reset', () => {
  it('returns 200', async (done) => {
    const response = await request.get('/reset')
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    const response = await request.get('/reset')
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  test.todo('check the body content returned is correct');
  test.todo('refactor reset for no matching token and test');
});

describe('/reset-scores', () => {
  it('returns 200', async (done) => {
    const response = await request.get('/reset-scores')
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    const response = await request.get('/reset-scores')
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });
});

describe('/move', () => {
  const body = {
    button: '0',
  };

  it('returns 200', async (done) => {
    const response = await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken'])
      .expect(200);
    done();
  });

  it('returns json', async (done) => {
    const response = await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=RandomToken'])
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns error 400 if board is full', async (done) => {
    const response = await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=lastTurnTest_token'])
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('"The selected column is full"');
    done();
  });

  it('returns the correct error message', async (done) => {
    const response = await request
      .post('/move')
      .send(body)
      .set('Cookie', ['token=lastTurnTest_token'])
      .expect('"The selected column is full"');
    done();
  });

  test.todo('different move errors');
});

describe('/login', () => {
  const body = {
    username: 'otherCoolUsername',
    password: 'password123',
  };

  const data = {
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

  it('returns 200', async (done) => {
    const response = await request
      .post('/login')
      .send(body)
      .expect(200);
    done();
  });

  it('returns a json', async (done) => {
    const response = await request
      .post('/login')
      .send(body)
      .expect('Content-Type', 'application/json; charset=utf-8');
    done();
  });

  it('returns the correct body data', async (done) => {
    const response = await request
      .post('/login')
      .send(body)
      .expect(data);
    done();
  });

  test.todo('login errors');
});

describe('hit and invalid endpoint', () => {
  it('return 404 error', async (done) => {
    const response = await request
      .get('/non-existent-endpoint')
      .expect(404)
      .expect('Content-Type', 'text/html; charset=utf-8');
    done();
  });
});
