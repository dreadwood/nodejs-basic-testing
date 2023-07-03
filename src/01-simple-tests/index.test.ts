import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 40,
      b: 2,
      action: Action.Add,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(42);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 80,
      b: 38,
      action: Action.Subtract,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(42);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 6,
      b: 7,
      action: Action.Multiply,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 1134,
      b: 27,
      action: Action.Divide,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(42);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 2,
      b: 10,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 2,
      b: 10,
      action: 'Logic',
    };

    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 2,
      b: '10',
      action: Action.Add,
    };

    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
