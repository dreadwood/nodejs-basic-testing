// Uncomment the code below and write your tests
import {
  resolveValue,
  throwError,
  MyAwesomeError,
  throwCustomError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = resolveValue('I am Promise resolve');
    expect(result).resolves.toBe('I am Promise resolve');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const result = () => throwError('I am Error');
    expect(result).toThrow('I am Error');
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();
    expect(result).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();
    expect(result).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = () => rejectCustomError();
    expect(result).rejects.toThrow(MyAwesomeError);
  });
});
