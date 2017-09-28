import { dailyTracker as reducers } from './daily-tracker.reducers.js';
import * as actions from './actions.constants';

let defaultAction;
let before;
const initialState = {
  isHydrated: false,
  isFetching: false,
  error: undefined
};

describe('Daily tracker', () => {
  describe('`tracker` state', () => {
    beforeEach(() => {
      defaultAction = { type: 'Not a valid action type' };
      before = reducers(undefined, defaultAction).spending;
    });

    it('should have expected initial state', () => {
      expect(before).toEqual(initialState);
    });

    it('DAILY_TRACKER_FETCH updates `isFetching`', () => {
      const type = actions.DAILY_TRACKER_HISTORY_FETCH;
      const { tracker } = reducers(undefined, { type });
      const expected = {
        isHydrated: false,
        isFetching: true,
        error: undefined
      };
      expect(before).toEqual(initialState);
      expect(tracker).toEqual(expected);
    });

    it('DAILY_TRACKER_FETCH_SUCCESS updates `tracker`', () => {
      const type = actions.DAILY_TRACKER_FETCH_SUCCESS;
      const payload = { tracker: 'test' };
      const { tracker } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: true,
        isFetching: false,
        error: undefined,
        tracker: 'test'
      };
      expect(before).toEqual(initialState);
      expect(tracker).toEqual(expected);
    });

    it('DAILY_TRACKER_FETCH_FAILURE sets `error`', () => {
      const type = actions.DAILY_TRACKER_FETCH_FAILURE;
      const payload = { message: 'test' };
      const { tracker } = reducers(undefined, { type, payload });
      const expected = {
        isHydrated: false,
        isFetching: false,
        error: payload
      };
      expect(before).toEqual(initialState);
      expect(tracker).toEqual(expected);
    });
  });
});
