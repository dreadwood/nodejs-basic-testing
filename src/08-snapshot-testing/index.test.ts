import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 1, 1, 1]);

    expect(linkedList).toStrictEqual({
      next: {
        next: {
          next: {
            next: {
              next: null,
              value: null,
            },
            value: 1,
          },
          value: 1,
        },
        value: 1,
      },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([2, 2, 2, 2]);
    expect(linkedList).toMatchSnapshot();
  });
});
