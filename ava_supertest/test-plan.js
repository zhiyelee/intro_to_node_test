import test from 'ava';

test('use plan to ensure a specific number of assertions are made', (t) => {
  t.plan(2);
  t.not(5, 3, '5 not equal to 3')

  return Promise.resolve([1,2,3]).then(data => {
    t.same(data, [1, 2, 3], 'expected data equal to [1, 2, 3]');
  })
});
