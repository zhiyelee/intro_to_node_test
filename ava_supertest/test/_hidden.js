import test from 'ava';

test('regular', t => {
  t.pass();
});

test('skip unfinish test', t => {
  t.fail();
})
