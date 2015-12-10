import test from 'ava';

test('regular', t => {
  // t.ok(5, '5 is true');
  t.pass();
});

// should be skip
test('skip unfinished test', t => {
  t.true(5, '5 === true');
})

// what will happen when remove only
test.only('only me', t => {
  t.pass();
})
