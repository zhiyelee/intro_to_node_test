import test from 'ava';

test('support generator function', function *(t) {
  const val = yield Promise.resolve(5);

  t.is(val, 5, 'yield val');
});

test('support await', async (t) => {
  const val = await Promise.resolve(5);

  t.is(val, 5, 'async/await');
});
