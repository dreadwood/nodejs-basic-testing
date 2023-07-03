import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPromise from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockFn, 200);

    expect(setTimeout).toHaveBeenCalledWith(mockFn, 200);
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();

    doStuffByTimeout(mockFn, 100);

    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(100);
    expect(mockFn).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockFn, 300);

    expect(setInterval).toHaveBeenCalledWith(mockFn, 300);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFn = jest.fn();

    doStuffByInterval(mockFn, 100);

    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'index.test.ts';
    const mockSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(mockSpy).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const result = await readFileAsynchronously('index.test.ts');

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const content = 'Hello world!';
    const pathToFile = 'index.ts';

    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    const mockReadFile = jest.spyOn(fsPromise, 'readFile');

    mockExistsSync.mockReturnValueOnce(true);
    mockReadFile.mockResolvedValueOnce(content);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(content);
  });
});
