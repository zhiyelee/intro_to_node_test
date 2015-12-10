import test from 'ava';

//test.before('before', () => {
//  console.log('before');
//});
//test.after('after', () => {
//  console.log('after');
//});
//test.afterEach('afterEach', () => {
//  console.log('afterEach');
//});
//test.beforeEach('beforeEach', () => {
//  console.log('beforeEach');
//});


test('regular', t => {
   t.ok(1, '1 is truthy');
});

// check whether a promise will reject
test('throw', t => {
  t.throws(Promise.reject('reject message'), /reject message/, 'promise should reject');
});
