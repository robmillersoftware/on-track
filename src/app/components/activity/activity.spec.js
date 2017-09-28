import * as actions from './activity.actions.js';
import * as reducers from './activity.reducers.js';

let defaultAction;
let before;
const initialState = {
  account: {},
  transactions: [],
  fetching: false
};

describe('Activity Reducers', () => {
  beforeEach(() => {
    defaultAction = { type: 'Not a valid action type' };
    before = reducers.activity(undefined, defaultAction);
  });

  it('should return initial state by default', () => {
    expect(before).toEqual(initialState);
  });

  it('should set the state to fetching when fetching', () => {
    const activity = reducers.activity(before, {
      type: actions.ACTIVITY_FETCH
    });
    const expected = {
      account: {},
      transactions: [],
      fetching: true,
      error: undefined
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });

  it('should add transactions that are fetched', () => {
    const transactions = [1, 2, 3];
    const account = {};
    const activity = reducers.activity(before, {
      type: actions.ACTIVITY_FETCH_SUCCESS,
      payload: {
        account,
        transactions
      }
    });
    const expected = {
      account: {},
      transactions,
      fetching: false
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });

  it('should give an error when it fails to fetch activity', () => {
    const error = 'Error!';
    const activity = reducers.activity(before, {
      type: actions.ACTIVITY_FETCH_FAILURE,
      payload: error
    });
    const expected = {
      account: {},
      transactions: [],
      fetching: false,
      error
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });
});
