import { toDollars, parseCurrency } from './currency.js';

describe('Currency formatter', () => {
  it('returns $0.00 when given invalid input', () => {
    expect(toDollars('not a number')).toEqual('$0.00');
  });
  it('appends the dollar sign', () => {
    expect(toDollars(1)).toEqual('$1.00');
  });
  it('returns integers with .00', () => {
    expect(toDollars(25)).toEqual('$25.00');
  });
  it('returns floats rounded to two decimal places', () => {
    expect(toDollars(1.1)).toEqual('$1.10');
    expect(toDollars(1.12)).toEqual('$1.12');
    expect(toDollars(1.123456)).toEqual('$1.12');
  });
  it('inserts commas to group digits by three', () => {
    expect(toDollars(12345678)).toEqual('$12,345,678.00');
  });
});

describe('Currency parser', () => {
  it('returns the float value for a simple integer', () => {
    expect(parseCurrency('1')).toEqual(1.0);
  });
  it('returns the float value for a float string', () => {
    expect(parseCurrency('1.5')).toEqual(1.5);
  });
  it('returns the float value for a dollar string', () => {
    expect(parseCurrency('$1')).toEqual(1.0);
  });
  it('returns the float value for a dollar string with some cents', () => {
    expect(parseCurrency('$1.50')).toEqual(1.5);
  });
  it('still works with thousand place markers', () => {
    expect(parseCurrency('$1,000,000.00')).toEqual(1000000.0);
  });
});
