import Transactions from './Transactions.service.js';
let service;

describe('Search/filter/sort transactions service', () => {
  beforeEach(() => {
    service = new Transactions();
  });

  it('should tell us when one transaction is more recent', () => {
    const a = { date: new Date(1215, 5, 15) };
    const b = { date: new Date(1776, 6, 4) };
    const comparison = service.moreRecent(a, b);
    expect(comparison).toBeLessThan(0);
  });

  it('should tell us when one transaction is less recent', () => {
    const a = { date: new Date(1215, 5, 15) };
    const b = { date: new Date(1776, 6, 4) };
    const comparison = service.moreRecent(b, a);
    expect(comparison).toBeGreaterThan(0);
  });

  it('should mark pending transactions as more recent', () => {
    const a = { date: new Date(1215, 5, 15) };
    const b = { date: new Date(1776, 6, 4), isPending: true };
    const comparison = service.moreRecent(a, b);
    expect(comparison).toBeGreaterThan(0);
  });

  it('should be able to determine which transaction has a description that ' +
    'would appear first alphabetically', () => {
    const a = { description: 'aaa' };
    const b = { description: 'aba' };
    const comparison = service.alphabetically(a, b);
    expect(comparison).toBeLessThan(0);
  });

  it('should be able to determine which transaction is a withdrawal for a ' +
    'larger amount', () => {
    const a = { cashOut: 10.0 };
    const b = { cashOut: 5.0 };
    const comparison = service.moreWithdrawn(a, b);
    expect(comparison).toBeLessThan(0);
  });

  it('should be able to determine which transaction is a withdrawal for a ' +
    'larger amount (count non-withdrawals as $0.00)', () => {
    const a = { cashOut: 10.0 };
    const b = { cashIn: 15.0 };
    const comparison = service.moreWithdrawn(a, b);
    expect(comparison).toBeLessThan(0);
  });

  it('should be able to determine which transaction is a deposit for a ' +
    'larger amount', () => {
    const a = { cashIn: 10.0 };
    const b = { cashIn: 5.0 };
    const comparison = service.moreDeposited(a, b);
    expect(comparison).toBeLessThan(0);
  });

  it('should be able to determine which transaction is a deposit for a ' +
    'larger amount (count non-deposits as $0.00)', () => {
    const a = { cashIn: 10.0 };
    const b = { cashOut: 15.0 };
    const comparison = service.moreDeposited(a, b);
    expect(comparison).toBeLessThan(0);
  });

  it('should sort transactions in chronological order', () => {
    const transactions = [
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4), isPending: true },
      { date: new Date(1863, 0, 1) }
    ];
    const criteria = { field: 'date', direction: 1 };
    const expected = [
      { date: new Date(1776, 6, 4), isPending: true },
      { date: new Date(1215, 5, 15) },
      { date: new Date(1863, 0, 1) }
    ];
    const sorted = service.sort(transactions, criteria);
    expect(sorted).toEqual(expected);
  });

  it('should sort transactions in reverse chronological order', () => {
    const transactions = [
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4), isPending: true },
      { date: new Date(1863, 0, 1) }
    ];
    const criteria = { field: 'date', direction: -1 };
    const expected = [
      { date: new Date(1863, 0, 1) },
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4), isPending: true }
    ];
    const sorted = service.sort(transactions, criteria);
    expect(sorted).toEqual(expected);
  });

  it('should sort transactions alphabetically by description', () => {
    const transactions = [
      { description: 'D' },
      { description: 'A' },
      { description: 'C' },
      { description: 'B' },
    ];
    const criteria = { field: 'description', direction: 1 };
    const expected = [
      { description: 'A' },
      { description: 'B' },
      { description: 'C' },
      { description: 'D' }
    ];
    const sorted = service.sort(transactions, criteria);
    expect(sorted).toEqual(expected);
  });

  it('should sort transactions by description in reverse alphabetical order',
    () => {
      const transactions = [
        { description: 'D' },
        { description: 'A' },
        { description: 'C' },
        { description: 'B' },
      ];
      const criteria = { field: 'description', direction: -1 };
      const expected = [
        { description: 'D' },
        { description: 'C' },
        { description: 'B' },
        { description: 'A' }
      ];
      const sorted = service.sort(transactions, criteria);
      expect(sorted).toEqual(expected);
    });

  it('should sort transactions by withdrawal amounts in ascending order',
    () => {
      const transactions = [
        { cashOut: 10.0 },
        { cashOut: 5.0 },
        { cashIn: 25.0 },
        { cashOut: 20.0 }
      ];
      const criteria = { field: 'withdrawal', direction: 1 };
      const expected = [
        { cashIn: 25.0 },
        { cashOut: 5.0 },
        { cashOut: 10.0 },
        { cashOut: 20.0 }
      ];
      const sorted = service.sort(transactions, criteria);
      expect(sorted).toEqual(expected);
    });

  it('should sort transactions by withdrawal amounts in descending order',
    () => {
      const transactions = [
        { cashOut: 10.0 },
        { cashOut: 5.0 },
        { cashIn: 25.0 },
        { cashOut: 20.0 }
      ];
      const criteria = { field: 'withdrawal', direction: -1 };
      const expected = [
        { cashOut: 20.0 },
        { cashOut: 10.0 },
        { cashOut: 5.0 },
        { cashIn: 25.0 }
      ];
      const sorted = service.sort(transactions, criteria);
      expect(sorted).toEqual(expected);
    });

  it('should sort transactions by deposit amounts in ascending order',
    () => {
      const transactions = [
        { cashIn: 10.0 },
        { cashIn: 5.0 },
        { cashOut: 25.0 },
        { cashIn: 20.0 }
      ];
      const criteria = { field: 'deposit', direction: 1 };
      const expected = [
        { cashOut: 25.0 },
        { cashIn: 5.0 },
        { cashIn: 10.0 },
        { cashIn: 20.0 }
      ];
      const sorted = service.sort(transactions, criteria);
      expect(sorted).toEqual(expected);
    });

  it('should sort transactions by deposit amounts in descending order',
    () => {
      const transactions = [
        { cashIn: 10.0 },
        { cashIn: 5.0 },
        { cashOut: 25.0 },
        { cashIn: 20.0 }
      ];
      const criteria = { field: 'deposit', direction: -1 };
      const expected = [
        { cashIn: 20.0 },
        { cashIn: 10.0 },
        { cashIn: 5.0 },
        { cashOut: 25.0 }
      ];
      const sorted = service.sort(transactions, criteria);
      expect(sorted).toEqual(expected);
    });

  it('should search transaction descriptions', () => {
    const transactions = [
      { description: 'target', description2: 'no' },
      { description: 'no', description2: 'target' },
      { description: 'target', description2: 'target' },
      { description: 'no', description2: 'no' }
    ];
    const expected = [
      { description: 'target', description2: 'no' },
      { description: 'no', description2: 'target' },
      { description: 'target', description2: 'target' }
    ];
    const searched = service.search(transactions, 'target');
    expect(searched).toEqual(expected);
  });

  it('should search transaction descriptions (ignore capitalization)', () => {
    const transactions = [
      { description: 'target', description2: 'no' },
      { description: 'no', description2: 'target' },
      { description: 'target', description2: 'target' },
      { description: 'no', description2: 'no' }
    ];
    const expected = [
      { description: 'target', description2: 'no' },
      { description: 'no', description2: 'target' },
      { description: 'target', description2: 'target' }
    ];
    const searched = service.search(transactions, 'TaRgEt');
    expect(searched).toEqual(expected);
  });

  it('should search transaction amounts', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 }
    ];
    const searched = service.search(transactions, '$5.00');
    expect(searched).toEqual(expected);
  });

  it('should search transaction dates', () => {
    const transactions = [
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4) }
    ];
    const expected = [
      { date: new Date(1776, 6, 4) }
    ];
    const searched = service.search(transactions, '07/04/1776');
    expect(searched).toEqual(expected);
  });

  it('should return transactions between dates', () => {
    const transactions = [
      { date: new Date(1066, 9, 14) },
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4) }
    ];
    const expected = [
      { date: new Date(1215, 5, 15) }
    ];
    const a = new Date(1200, 0, 1);
    const b = new Date(1500, 0, 1);
    const between = service.between(transactions, 'date', a, b);
    expect(between).toEqual(expected);
  });

  it('should return transactions after a date', () => {
    const transactions = [
      { date: new Date(1066, 9, 14) },
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4) }
    ];
    const expected = [
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4) }
    ];
    const a = new Date(1200, 0, 1);
    const after = service.between(transactions, 'date', a);
    expect(after).toEqual(expected);
  });

  it('should return transactions before a date', () => {
    const transactions = [
      { date: new Date(1066, 9, 14) },
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4) }
    ];
    const expected = [
      { date: new Date(1066, 9, 14) },
      { date: new Date(1215, 5, 15) }
    ];
    const b = new Date(1500, 0, 1);
    const before = service.between(transactions, 'date', null, b);
    expect(before).toEqual(expected);
  });

  it('should return transactions between check numbers', () => {
    const transactions = [];
    for (let i = 100; i < 110; i++) {
      transactions.push({ checkNumber: i });
    }
    const expected = [
      { checkNumber: 103 }, { checkNumber: 104 }, { checkNumber: 105 }
    ];
    const between = service.between(transactions, 'checkNumber', 103, 105);
    expect(between).toEqual(expected);
  });

  it('should return transactions after a check number', () => {
    const transactions = [];
    for (let i = 100; i < 110; i++) {
      transactions.push({ checkNumber: i });
    }
    const expected = [
      { checkNumber: 104 }, { checkNumber: 105 }, { checkNumber: 106 },
      { checkNumber: 107 }, { checkNumber: 108 }, { checkNumber: 109 }
    ];
    const after = service.between(transactions, 'checkNumber', 104);
    expect(after).toEqual(expected);
  });

  it('should return transactions before a check number', () => {
    const transactions = [];
    for (let i = 100; i < 110; i++) {
      transactions.push({ checkNumber: i });
    }
    const expected = [
      { checkNumber: 100 }, { checkNumber: 101 }, { checkNumber: 102 },
      { checkNumber: 103 }, { checkNumber: 104 }, { checkNumber: 105 }
    ];
    const before = service.between(transactions, 'checkNumber', null, 105);
    expect(before).toEqual(expected);
  });

  it('should return transactions between cash amounts in or out', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const between = service.between(transactions, 'amount', 1, 6);
    expect(between).toEqual(expected);
  });

  it('should return transactions above a cash amount in or out', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 }
    ];
    const above = service.between(transactions, 'amount', 4);
    expect(above).toEqual(expected);
  });

  it('should return transactions below a cash amount in or out', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const below = service.between(transactions, 'amount', null, 6);
    expect(below).toEqual(expected);
  });

  it('should filter to search results when given a query', () => {
    const transactions = [
      { description: 'target', description2: 'no' },
      { description: 'no', description2: 'target' },
      { description: 'target', description2: 'target' },
      { description: 'no', description2: 'no' }
    ];
    const filtered = service.filter(transactions, { query: 'target' });
    expect(filtered.length).toEqual(3);
  });

  it('should filter to dates when given a date', () => {
    const transactions = [
      { date: new Date(1066, 9, 14) },
      { date: new Date(1215, 5, 15) },
      { date: new Date(1776, 6, 4) }
    ];
    const filtered = service.filter(transactions, {
      date: {
        from: new Date(1200, 0, 1),
        to: new Date(1500, 0, 1)
      }
    });
    expect(filtered.length).toEqual(1);
  });

  it('should filter to check numbers when given', () => {
    const transactions = [];
    for (let i = 100; i < 110; i++) {
      transactions.push({ checkNumber: i });
    }
    const filtered = service.filter(transactions, {
      check: {
        from: 103,
        to: 105
      }
    });
    expect(filtered.length).toEqual(3);
  });

  it('should filter to cash in/out amounts when given', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const filtered = service.filter(transactions, {
      amount: {
        from: '$4.00',
        to: '$6.00'
      }
    });
    expect(filtered.length).toEqual(2);
  });

  it('can identify a pending transaction', () => {
    const transaction = { isPending: true };
    expect(service.isPending(transaction)).toEqual(true);
  });

  it('can identify a posted transaction from its isPending property', () => {
    const transaction = { isPending: false };
    expect(service.isPending(transaction)).toEqual(false);
  });

  it('can identify a posted transaction from no isPending property', () => {
    const transaction = {};
    expect(service.isPending(transaction)).toEqual(false);
  });

  it('can identify a deposit', () => {
    const transaction = { cashIn: 5.0 };
    expect(service.isDeposit(transaction)).toEqual(true);
  });

  it('can identify a transaction that is not a deposit', () => {
    const transaction = { cashOut: 5.0 };
    expect(service.isDeposit(transaction)).toEqual(false);
  });

  it('can identify a withdrawal', () => {
    const transaction = { cashOut: 5.0 };
    expect(service.isWithdrawal(transaction)).toEqual(true);
  });

  it('can identify a transaction that is not a withdrawal', () => {
    const transaction = { cashIn: 5.0 };
    expect(service.isWithdrawal(transaction)).toEqual(false);
  });

  it('can identify a check', () => {
    const transaction = { isCheck: true };
    expect(service.isCheck(transaction)).toEqual(true);
  });

  it('can identify a transaction that is explicitly not a check', () => {
    const transaction = { isCheck: false };
    expect(service.isCheck(transaction)).toEqual(false);
  });

  it('can identify a transaction that is implicitly not a check', () => {
    const transaction = { cashIn: 5.0 };
    expect(service.isCheck(transaction)).toEqual(false);
  });

  it('should return all transactions', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const filtered = service.filter(transactions, {
      justShow: []
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return pending transactions', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0, isPending: true },
      { cashOut: 5.0, balance: 95.0, isPending: true },
      { cashIn: 8.0, balance: 103.0, isPending: false },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0, isPending: true },
      { cashOut: 5.0, balance: 95.0, isPending: true }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['pending']
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return posted transactions', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0, isPending: true },
      { cashOut: 5.0, balance: 95.0, isPending: true },
      { cashIn: 8.0, balance: 103.0, isPending: false },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 8.0, balance: 103.0, isPending: false },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['posted']
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return deposits', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 5.0, balance: 100.0 },
      { cashIn: 8.0, balance: 103.0 }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['deposits']
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return withdrawals', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashOut: 5.0, balance: 95.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['withdrawals']
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return checks', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0, isCheck: false },
      { cashOut: 5.0, balance: 95.0, isCheck: true },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashOut: 5.0, balance: 95.0, isCheck: true }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['checks']
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return withdrawals that are checks', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0, isCheck: true },
      { cashOut: 5.0, balance: 95.0, isCheck: true },
      { cashIn: 8.0, balance: 103.0 },
      { cashOut: 3.0, balance: 100.0, isCheck: false },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashOut: 5.0, balance: 95.0, isCheck: true }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['withdrawals', 'checks']
    });
    expect(filtered).toEqual(expected);
  });

  it('should just return deposits that are checks', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0, isCheck: false },
      { cashIn: 5.0, balance: 100.0 },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, balance: 103.0, isCheck: true },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 8.0, balance: 103.0, isCheck: true }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['deposits', 'checks']
    });
    expect(filtered).toEqual(expected);
  });

  // This is not a situation that should ever exist in real data.
  it('should just return transactions that are both deposits and withdrawals',
    () => {
      const transactions = [
        { cashIn: 5.0, balance: 100.0 },
        { cashOut: 5.0, balance: 95.0 },
        { cashIn: 8.0, cashOut: 8.0, balance: 103.0 },
        { cashOut: 3.0, balance: 100.0 }
      ];
      const expected = [
        { cashIn: 8.0, cashOut: 8.0, balance: 103.0 }
      ];
      const filtered = service.filter(transactions, {
        justShow: ['deposits', 'withdrawals']
      });
      expect(filtered).toEqual(expected);
    });

  // This is not a situation that should ever exist in real data.
  it('should just return transactions that are deposits, withdrawals, and ' +
    'checks, all at once', () => {
    const transactions = [
      { cashIn: 5.0, balance: 100.0, isCheck: true },
      { cashIn: 5.0, balance: 100.0, isCheck: false },
      { cashOut: 5.0, balance: 95.0 },
      { cashIn: 8.0, cashOut: 8.0, balance: 103.0, isCheck: true },
      { cashOut: 3.0, balance: 100.0 }
    ];
    const expected = [
      { cashIn: 8.0, cashOut: 8.0, balance: 103.0, isCheck: true }
    ];
    const filtered = service.filter(transactions, {
      justShow: ['deposits', 'withdrawals', 'checks']
    });
    expect(filtered).toEqual(expected);
  });
});
