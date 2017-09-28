import * as actions from './bill-dot-com-access.actions.js';
import * as reducers from './bill-dot-com-access.reducers.js';

let defaultAction;
let before;
const initialState = {
  active: null,
  enrolled: null,
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
      type: actions.ACCESS_FETCH
    });
    const expected = {
      active: null,
      enrolled: null,
      fetching: true,
      error: undefined
    };

    expect(before).toEqual(initialState);
    expect(actual).toEqual(expected);
  });

  it('should add transactions that are fetched', () => {
    const actual = reducers.entitlements(before, {
      type: actions.ACCESS_FETCH_SUCCESS,
      payload: {
        active: true,
        enrolled: false
      }
    });
    const expected = {
      active: true,
      enrolled: false,
      fetching: false,
      error: undefined
    };

    expect(before).toEqual(initialState);
    expect(actual).toEqual(expected);
  });

  it('should give an error when it fails to fetch activity', () => {
    const error = 'Error!';
    const actual = reducers.entitlements(before, {
      type: actions.ACCESS_FETCH_FAILURE,
      payload: error
    });
    const expected = {
      active: null,
      enrolled: null,
      fetching: false,
      error
    };

    expect(before).toEqual(initialState);
    expect(actual).toEqual(expected);
  });
});
