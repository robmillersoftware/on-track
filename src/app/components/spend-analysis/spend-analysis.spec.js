import { spendAnalysis as reducers } from './spend-analysis.reducers.js';
import * as actions from './actions.constants';

let defaultAction;
let before;
const initialState = {
  isHydrated: false,
  isFetching: false,
  error: undefined
};

describe('Spend analysis', () => {
  describe('`spending` state', () => {
    beforeEach(() => {
      defaultAction = { type: 'Not a valid action type' };
      before = reducers(undefined, defaultAction).spending;
    });

    it('should have expected initial state', () => {
      expect(before).toEqual(initialState);
    });

    it('SPENDING_HISTORY_FETCH updates `isFetching`', () => {
      const type = actions.SPENDING_HISTORY_FETCH;
      const { spending } = reducers(undefined, { type });
      const expected = {
        isHydrated: false,
        isFetching: true,
        error: undefined
      };
      expect(before).toEqual(initialState);
      expect(spending).toEqual(expected);
    });

    it('SPENDING_HISTORY_FETCH_SUCCESS updates `spending`', () => {
      const type = actions.SPENDING_HISTORY_FETCH_SUCCESS;
      const payload = { spending: 'test' };
      const { spending } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: true,
        isFetching: false,
        error: undefined,
        spending: 'test'
      };
      expect(before).toEqual(initialState);
      expect(spending).toEqual(expected);
    });

    it('SPENDING_HISTORY_FETCH_FAILURE sets `error`', () => {
      const type = actions.SPENDING_HISTORY_FETCH_FAILURE;
      const payload = { message: 'test' };
      const { spending } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: false,
        isFetching: false,
        error: payload
      };
      expect(before).toEqual(initialState);
      expect(spending).toEqual(expected);
    });

    it('SELECT_MONTH updates `selected` data', () => {
      const type = actions.SELECT_MONTH;
      const payload = { selected: 'test' };
      const { spending } = reducers(undefined, { type, payload });
      const expected = Object.assign({}, initialState, {
        selected: payload
      });
      expect(before).toEqual(initialState);
      expect(spending).toEqual(expected);
    });
  });

  describe('`transactions` state', () => {
    beforeEach(() => {
      defaultAction = { type: 'Not a valid action type' };
      before = reducers(undefined, defaultAction).transactions;
    });

    it('should have expected initial state', () => {
      expect(before).toEqual(initialState);
    });

    it('TRANSACTIONS_FETCH updates `isFetching`', () => {
      const type = actions.TRANSACTIONS_FETCH;
      const { transactions } = reducers(undefined, { type });
      const expected = {
        isHydrated: false,
        isFetching: true,
        error: undefined
      };
      expect(before).toEqual(initialState);
      expect(transactions).toEqual(expected);
    });

    it('TRANSACTIONS_FETCH_SUCCESS updates `all`', () => {
      const type = actions.TRANSACTIONS_FETCH_SUCCESS;
      const payload = [1, 2, 3];
      const { transactions } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: true,
        isFetching: false,
        error: undefined,
        all: payload
      };
      expect(before).toEqual(initialState);
      expect(transactions).toEqual(expected);
    });

    it('TRANSACTIONS_FETCH_FAILURE sets `error`', () => {
      const type = actions.TRANSACTIONS_FETCH_FAILURE;
      const payload = { message: 'test' };
      const { transactions } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: false,
        isFetching: false,
        error: payload
      };
      expect(before).toEqual(initialState);
      expect(transactions).toEqual(expected);
    });
  });

  describe('`categories` state', () => {
    beforeEach(() => {
      defaultAction = { type: 'Not a valid action type' };
      before = reducers(undefined, defaultAction).categories;
    });

    it('should have expected initial state', () => {
      expect(before).toEqual(initialState);
    });

    it('CATEGORIES_FETCH updates `isFetching`', () => {
      const type = actions.CATEGORIES_FETCH;
      const { categories } = reducers(undefined, { type });
      const expected = {
        isHydrated: false,
        isFetching: true,
        error: undefined
      };
      expect(before).toEqual(initialState);
      expect(categories).toEqual(expected);
    });

    it('CATEGORIES_FETCH_SUCCESS updates `all`', () => {
      const type = actions.CATEGORIES_FETCH_SUCCESS;
      const payload = [1, 2, 3];
      const { categories } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: true,
        isFetching: false,
        error: undefined,
        all: payload
      };
      expect(before).toEqual(initialState);
      expect(categories).toEqual(expected);
    });

    it('CATEGORIES_FETCH_FAILURE sets `error`', () => {
      const type = actions.CATEGORIES_FETCH_FAILURE;
      const payload = { message: 'test' };
      const { categories } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: false,
        isFetching: false,
        error: payload
      };
      expect(before).toEqual(initialState);
      expect(categories).toEqual(expected);
    });
  });
});
