const each = require('jest-each').default;
const { TestScheduler } = require('jest');
const supertest = require('supertest');
const { app } = require('../src/backend/server');

const request = supertest(app);

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

test.todo('/');
test.todo('/info');
test.todo('/reset');
test.todo('/reset-scores');
test.todo('/move');
test.todo('/login');
test.todo('404 error');
