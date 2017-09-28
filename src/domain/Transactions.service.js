import moment from 'moment';
import { toDollars, parseCurrency } from '../app/shared/util';

export default class Transactions {
  /**
   * Compares two transactions. Returns a negative number if a is a more recent
   * transaction than b, 0 if the two are equally recent, or a positive number
   * if b is more recent than a. A pending transaction always counts as more
   * recent than a non-pending one.
   *
   * @param a - One of the transactions to be compared.
   * @param b - The other transaction to be compared.
   * @return {number} - A negative number if a is a more recent transaction than
   *   b, 0 if the two are equally recent, or a positive number if b is a more
   *   recent transaction than a.
   */

  moreRecent(a, b) {
    let comp = 0;
    if (a.isPending) {
      comp = -1;
    } else if (b.isPending) {
      comp = 1;
    } else {
      comp = a.date - b.date;
    }
    return comp;
  }

  /**
   * Compares two transactions. Returns a negative number if a is due more
   * recently than b, 0 if the two have equal due dates, or a positive number
   * if b is due more recently than a. A transaction with a due date is always
   * considered as due less recently with one that does have one.
   *
   * @param a - One of the transactions to be compared.
   * @param b - The other transaction to be compared.
   * @return {number} - A negative number if a is due more recently than b, 0
   *   if the two have equal due dates, or a positive number if b is due more
   *   recently than a. A transaction with a due date is always considered as
   *   due less recently with one that does have one.
   */

  dueMoreRecently(a, b) {
    let comp = 0;
    if (!a.dueDate && b.dueDate) {
      comp = 1;
    } else if (a.dueDate && !b.dueDate) {
      comp = -1;
    } else if (a.dueDate && b.dueDate) {
      comp = a.dueDate - b.dueDate;
    }
    return comp;
  }

  /**
   * Compares two transactions. Returns a negative number if a's description
   * appears before b's alphabetically, 0 if they have identical description
   * fields, or a positive number if b's description appears before a's alpha-
   * betically.
   *
   * @param a - One of the transactions to be compared.
   * @param b - The other transaction to be compared.
   * @return {number} - A negative number if a's description appears before b's
   *   alphabetically, 0 if they have identical description fields, or a
   *   positive number if b's description appears before a's alphabetically.
   */

  alphabetically(a, b) {
    let val = 0;
    if (a.description.toUpperCase() < b.description.toUpperCase()) {
      val = -1;
    } else if (b.description.toUpperCase() < a.description.toUpperCase()) {
      val = 1;
    }
    return val;
  }

  /**
   * Compares two transactions. Returns a negative number if a is a withdrawal
   * for a larger amount than b, 0 if they both withdraw an equal amount, or a
   * positive number if b is a withdrawl for a larger amount than a. A deposit
   * is counted as a negative withdrawal, so that a deposit for $10.00 is a
   * -10.0 withdrawal.
   *
   * @param a - One of the transactions to be compared.
   * @param b - The other transaction to be compared.
   * @return {number} - A negative number if a is a withdrawal for a larger
   *   amount than b, 0 if they both withdraw an equal amount, or a positive
   *   number if b is a withdrawl for a larger amount than a. A deposit is
   *   counted as a negative withdrawal, so that a deposit of $10.00 is a
   *   -10.0 withdrawal.
   */

  moreWithdrawn(a, b) {
    const withdrawn = {
      a: a.cashOut,
      b: b.cashOut
    };
    if (!withdrawn.a) { withdrawn.a = (a.cashIn) ? a.cashIn * -1 : 0.0; }
    if (!withdrawn.b) { withdrawn.b = (b.cashIn) ? b.cashIn * -1 : 0.0; }
    return withdrawn.b - withdrawn.a;
  }

  /**
   * Compares two transactions. Returns a negative number if a is a deposit for
   * a larger amount than b, 0 if they both deposit an equal amount, or a
   * positive number if b is a deposit for a larger amount than a. A withdrawal
   * is counted as a negative deposit, so that a withdrawal of $10.00 is a
   * -10.0 deposit.
   *
   * @param a - One of the transactions to be compared.
   * @param b - The other transaction to be compared.
   * @return {number} - A negative number if a is a deposit for a larger amount
   *   than b, 0 if they both deposit an equal amount, or a positive number if
   *   b is a deposit for a larger amount than a. A withdrawal is counted as a
   *   negative deposit, so that a withdrawal of $10.00 is a -10.0 deposit.
   */

  moreDeposited(a, b) {
    const deposited = {
      a: a.cashIn,
      b: b.cashIn
    };
    if (!deposited.a) { deposited.a = (a.cashOut) ? a.cashOut * -1 : 0.0; }
    if (!deposited.b) { deposited.b = (b.cashOut) ? b.cashOut * -1 : 0.0; }
    return deposited.b - deposited.a;
  }

  /**
   * Returns an array of transactions sorted by the criteria given.
   *
   * @param transactions - An array of transactions to sort. The function will
   *   return a new array with the same transactions sorted by the given
   *   criteria.
   * @param criteria - An object describing how to sort transactions.
   *   Properties should include 'field', specifying the field to sort by
   *   (expected values are 'date', 'description', 'withdrawal', or 'deposit')
   *   and 'direction', specifying whether to sort that field in ascending (a
   *   positive number) or descending (a negative number) order.
   * @return {Object} - A copy of the array of transactions provided sorted
   *   by the criteria provided.
   */

  sort(transactions, criteria) {
    const list = transactions.slice();
    switch (criteria.field) {
      case 'description':
        list.sort(this.alphabetically);
        if (criteria.direction < 0) {
          list.reverse();
        }
        break;
      case 'withdrawal':
        list.sort(this.moreWithdrawn);
        if (criteria.direction > 0) {
          list.reverse();
        }
        break;
      case 'deposit':
        list.sort(this.moreDeposited);
        if (criteria.direction > 0) {
          list.reverse();
        }
        break;
      case 'dueDate':
        list.sort(this.dueMoreRecently);
        if (criteria.direction < 0) {
          list.reverse();
        }
        break;
      default:
        list.sort(this.moreRecent);
        if (criteria.direction < 0) {
          list.reverse();
        }
        break;
    }
    return list;
  }

  /**
   * Filters transactions to those that match a text string.
   *
   * @param transactions - The array of transactions to be filtered.
   * @param query - A string to match. Will return only those transactions which
   *   include this string in the description, date, check number, or the
   *   specific withdrawal, deposit, or balance amount.
   * @return {Object[]} An array of transactions that match the provided query.
   */

  search(transactions, query) {
    const results = [];
    transactions.forEach((transaction) => {
      const queryable = [transaction.description, transaction.description2,
        moment(transaction.date).format('MM/DD/YYYY'),
        moment(transaction.dueDate).format('MM/DD/YYYY')];
      const amounts = ['cashIn', 'cashOut', 'balance'];
      amounts.forEach(key => {
        if (transaction[key]) {
          queryable.push(toDollars(transaction[key]));
        }
      });
      if (queryable.join(' ').toUpperCase().includes(query.toUpperCase())) {
        results.push(transaction);
      }
    });
    return results;
  }

  /**
   * Filters transactions to those that occur between the values provided for
   * the specified field.
   *
   * @param transactions - The array of transactions to be filtered.
   * @param field - The name of the transaction property to check. Expected
   *   values are 'date', 'checkNumber', and 'amount' (amount takes either
   *   cashIn or cashOut, as available on each transaction).
   * @param min - The minimum value the transaction can have for 'field' and
   *   be included in the filtered set.
   * @param max - The maximum value the transaction can have for 'field' and
   *   be included in the filtered set.
   * @return {Object[]} An array of transactions that fall within the specified
   *   range for the field given.
   */

  between(transactions, field, min, max) {
    const results = [];
    transactions.forEach(transaction => {
      let val = transaction[field];
      if (field === 'amount') {
        val = (transaction.cashIn) ? transaction.cashIn : transaction.cashOut;
      }
      // Each of the two clauses here check for the presence of min or max
      // first. This allows you to pass undefined, null, or false for min or
      // max, which will leave that uncapped. Passing a min without a max will
      // return everything with values of min or higher, whereas passing a max
      // without a min will return everything up to that max.
      if (((!min) || (val >= min)) && ((!max) || (val <= max))) {
        results.push(transaction);
      }
    });
    return results;
  }

  /**
   * Returns true if the transaction given is pending, or false if it is not.
   *
   * @param transaction - The transaction to check.
   * @return Boolean True if the transaction is pending, or false if it is not.
   */

  isPending(transaction) {
    let check = false;
    if (transaction.isPending) {
      check = transaction.isPending;
    }
    return check;
  }

  /**
   * Returns true if the transaction given is a deposit, or false if it is not.
   *
   * @param transaction - The transaction to check.
   * @return Boolean True if the transaction is a deposit, or false if it is
   *   not.
   */

  isDeposit(transaction) {
    let check = false;
    if (transaction.cashIn) {
      check = true;
    }
    return check;
  }

  /**
   * Returns true if the transaction given is a withdrawal, or false if it is
   * not.
   *
   * @param transaction - The transaction to check.
   * @return Boolean True if the transaction is a withdrawal, or false if it is
   *   not.
   */

  isWithdrawal(transaction) {
    let check = false;
    if (transaction.cashOut) {
      check = true;
    }
    return check;
  }

  /**
   * Returns true if the transaction given is a check, or false if it is not.
   *
   * @param transaction - The transaction to check.
   * @return Boolean True if the transaction is a check, or false if it is not.
   */

  isCheck(transaction) {
    let check = false;
    if (transaction.isCheck) {
      check = transaction.isCheck;
    }
    return check;
  }

  /**
   * Filters transactions to just those that match the criteria provided.
   *
   * @param transactions - The array of transactions to be filtered.
   * @param criteria - The criteria to use. Expected values are 'pending',
   *   'posted', 'deposits', 'withdrawals', and/or 'checks'. Unexpected values
   *   return all transactions.
   * @return {Object[]} An array of transaction objects filtered by the
   *   specified criteria.
   */

  just(transactions, criteria) {
    const filtered = [];
    let push = true;
    transactions.forEach(transaction => {
      switch (criteria) {
        case 'pending':
          push = this.isPending(transaction);
          break;
        case 'posted':
          push = !this.isPending(transaction);
          break;
        case 'deposits':
          push = this.isDeposit(transaction);
          break;
        case 'withdrawals':
          push = this.isWithdrawal(transaction);
          break;
        case 'checks':
          push = this.isCheck(transaction);
          break;
        default:
          break;
      }
      if (push) {
        filtered.push(transaction);
      }
    });
    return filtered;
  }

  /**
   * Filters transactions by the criteria provided.
   *
   * @param transactions - The array of transactions to be filtered.
   * @param filters - The filters to apply. This object may contain any of the
   *   following properties:
   *     - query: A string to match. Will return only those transactions which
   *         include this string in the description, date, check number, or the
   *         specific withdrawal, deposit, or balance amount.
   * @return {Object[]} An array of transaction objects filtered by the
   *   specified criteria.
   */

  filter(transactions, filters) {
    let filtered = transactions.slice(0);
    if (filters.query) {
      filtered = this.search(filtered, filters.query);
    }
    if (filters.date && (filters.date.from || filters.date.to)) {
      filtered = this.between(filtered, 'date', filters.date.from,
        filters.date.to);
    }
    if (filters.check && (filters.check.from || filters.check.to)) {
      filtered = this.between(filtered, 'checkNumber', filters.check.from,
        filters.check.to);
    }
    if (filters.amount && (filters.amount.from || filters.amount.to)) {
      filtered = this.between(filtered, 'amount',
        parseCurrency(filters.amount.from), parseCurrency(filters.amount.to));
    }
    if (filters.justShow) {
      filters.justShow.forEach(criteria => {
        filtered = this.just(filtered, criteria);
      });
    }
    return filtered;
  }
}
