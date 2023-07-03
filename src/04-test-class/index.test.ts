import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100500);
    const result = account.getBalance();

    expect(result).toBe(100500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1550);
    const result = () => account.withdraw(2000);

    expect(result).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const fromAccount = getBankAccount(100);
    const toAccount = getBankAccount(2100);
    const result = () => fromAccount.transfer(500, toAccount);

    expect(result).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const fromAccount = getBankAccount(1000);
    const result = () => fromAccount.transfer(600, fromAccount);

    expect(result).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const fromAccount = getBankAccount(920);
    fromAccount.deposit(500);
    const result = fromAccount.getBalance();

    expect(result).toBe(1420);
  });

  test('should withdraw money', () => {
    const fromAccount = getBankAccount(937);
    fromAccount.withdraw(271);
    const result = fromAccount.getBalance();

    expect(result).toBe(666);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(5480);
    const toAccount = getBankAccount(120);
    fromAccount.transfer(480, toAccount);
    const balanceFromAccount = fromAccount.getBalance();
    const balanceToAccount = toAccount.getBalance();

    expect(balanceFromAccount).toBe(5000);
    expect(balanceToAccount).toBe(600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(3000);
    const mockSpy = jest.spyOn(lodash, 'random');
    mockSpy.mockImplementation(() => 10);

    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
    expect(result).toBe(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const mockSpy = jest.spyOn(lodash, 'random');
    mockSpy.mockImplementation(() => 1);

    await account.synchronizeBalance();
    const result = account.getBalance();

    expect(result).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(5);
    const mockSpy = jest.spyOn(lodash, 'random');
    mockSpy.mockImplementation(() => 0);

    const result = async () => await account.synchronizeBalance();

    expect(result).rejects.toThrow(SynchronizationFailedError);
  });
});
