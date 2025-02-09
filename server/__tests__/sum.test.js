// this is useless for the app, but shows how the unit tests work
// run "npm test" in the terminal to run our unit tests in the __tests__ dir

const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
