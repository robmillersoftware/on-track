import { trend as reducers } from './trend.reducers.js';
import * as actions from './actions.service';


let defaultAction;
let before;
const initialState = {
  isHydrated: false,
  isFetching: false,
  error: undefined
};

describe('Trend', () => {
  describe('`trend` state', () => {
    beforeEach(() => {
      defaultAction = { type: 'Not a valid action type' };
      before = reducers(undefined, defaultAction);
    });

    it('should have expected initial state', () => {
      expect(before).toEqual(initialState);
    });
  });

  it('TREND_FETCH updates `isFetching`', () => {
    const type = actions.TREND_FETCH;
    const trend = reducers(before, { type });
    const expected = {
      isHydrated: false,
      isFetching: true,
      error: undefined
    };
    expect(before).toEqual(initialState);
    expect(trend).toEqual(expected);
  });

  it('TREND_FETCH_SUCCESS updates `trend`', () => {
    const type = actions.TREND_FETCH_SUCCESS;
    const payload = { trend: 'testing' };
    const { trend } = reducers(before, { type, payload });
    expect(before).toEqual(initialState);
    expect(trend).toEqual('testing');
  });

  it('TREND_FETCH_FAILURE sets `error`', () => {
    const type = actions.TREND_FETCH_FAILURE;
    const payload = 'test error message';
    const trend = reducers(before, { type, payload });
    const expected = {
      isHydrated: false,
      isFetching: false,
      error: payload
    };
    expect(before).toEqual(initialState);
    expect(trend).toEqual(expected);
  });
});

