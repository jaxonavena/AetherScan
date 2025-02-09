// example test -- has nothing to do with the app
// 'npm test' to run all tests

const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
