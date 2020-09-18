const each = require('jest-each').default;
const { TestScheduler } = require('jest');

const supertest = require('supertest');
const fs = require('fs').promises;
const mock = require('mock-fs');

const { app } = require('../src/backend/server');

const request = supertest(app);

require('iconv-lite').encodingExists('foo');

const dataObject = [{
  username: 'coolusername123',
  password: '123',
  token: 'RandomToken',
  gameData: [{
    board: [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]],
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

it('gets the info endpoint', async (done) => {
  const response = await request.get('/info')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect('"Welcome to connect 4. please read the docs to find the right endpoints"');
  done();
});

it('returns the front end', async (done) => {
  const response = await request.get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=UTF-8');
  done();
});

it('reset function', async (done) => {
  const response = await request.get('/reset')
    .set('Cookie', ['token=RandomToken'])
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  done();
});

it('/reset-scores', async (done) => {
  const response = await request.get('/reset-scores')
    .set('Cookie', ['token=RandomToken'])
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  done();
});

it('/move', async (done) => {
  const body = {
    button: '0',
  };
  const response = await request
    .post('/move')
    .send(body)
    .set('Cookie', ['token=RandomToken'])
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  done();
});

test.todo('/login');
test.todo('404 error');

test.todo('refactor reset for no matching token and test');
