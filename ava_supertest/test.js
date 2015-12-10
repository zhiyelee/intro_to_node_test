import test from 'ava';
import app from './server';
import request from 'supertest';


test.beforeEach((t) => {
  t.context.request = request(app);
});

test.cb('app.get("/foo")', (t) => {
  t.not(5, 3, '5 not equal to 3')
  t.context.request
    .get('/foo')
    .end((err, res) => {
      t.is(res.body, 'foo from the server', 'return value should be equal')
      t.end();
    });
});

test.cb('app.get("/foo/123")', (t) => {
  const id = '123';
  // use the context
  t.context.request
    .get(`/foo/${id}`)
    .end((err, res) => {
      t.is(res.body, id, 'return value should be equal')
      t.end();
    });
});
