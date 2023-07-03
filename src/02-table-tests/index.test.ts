import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 40, b: 2, action: Action.Add, expected: 42 },
  { a: 80, b: 38, action: Action.Subtract, expected: 42 },
  { a: 6, b: 7, action: Action.Multiply, expected: 42 },
  { a: 1134, b: 27, action: Action.Divide, expected: 42 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 2, b: 10, action: 'Logic', expected: null },
  { a: 40, b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'execution simpleCalculator({a: $a, b: $b, action: $action}) return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
