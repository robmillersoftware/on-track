import * as actions from './entitlements.actions.js';
import * as reducers from './entitlements.reducers.js';

let defaultAction;
let before;
const initialState = {
  fetching: false,
  error: undefined
};

describe('Bill.com Access Reducers', () => {
  beforeEach(() => {
    defaultAction = { type: 'Not a valid action type' };
    before = reducers.entitlements(undefined, defaultAction);
  });

  it('should return initial state by default', () => {
    expect(before).toEqual(initialState);
  });

  it('should set the state to fetching when fetching', () => {
    const actual = reducers.entitlements(before, {
      type: actions.ENTITLEMENTS_FETCH
    });
    const expected = {
      fetching: true,
      error: undefined
    };

    expect(before).toEqual(initialState);
    expect(actual).toEqual(expected);
  });

  it('should add transactions that are fetched', () => {
    const actual = reducers.entitlements(before, {
      type: actions.ENTITLEMENTS_FETCH_SUCCESS,
      payload: {
        dashboard: {
          access: true,
          flag: 'yes'
        },
        trend: 500
      }
    });
    const expected = {
      dashboard: {
        access: true,
        flag: 'yes'
      },
      trend: 500,
      fetching: false,
      error: undefined
    };

    expect(before).toEqual(initialState);
    expect(actual).toEqual(expected);
  });

  it('should give an error when it fails to fetch activity', () => {
    const error = 'Error!';
    const actual = reducers.entitlements(before, {
      type: actions.ENTITLEMENTS_FETCH_FAILURE,
      payload: error
    });
    const expected = {
      fetching: false,
      error
    };

    expect(before).toEqual(initialState);
    expect(actual).toEqual(expected);
  });
});
