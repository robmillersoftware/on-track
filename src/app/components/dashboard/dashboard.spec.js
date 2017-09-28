import * as actions from './dashboard.actions';
import { dashboard as reducers } from './dashboard.reducers.js';

describe('Dashboard reducers', () => {
  let before;
  const initialState = {
    isActive: false,
    tab: 'activity'
  };

  beforeEach(() => {
    before = reducers(undefined, { type: 'none' }).detail;
  });

  it('has expected initial state / defaults to activity', () => {
    expect(before).toEqual(initialState);
  });

  it('DETAIL_VIEW_TAB_CHANGE updates `tab`', () => {
    const type = actions.DETAIL_VIEW_TAB_CHANGE;
    const payload = { tab: 'timeline' };
    const { detail } = reducers(undefined, { type, payload });
    const expected = {
      isActive: false,
      tab: payload.tab
    };
    expect(detail).toEqual(expected);
  });

  it('DETAIL_VIEW_ACTIVATE updates `isActive` to true', () => {
    const type = actions.DETAIL_VIEW_ACTIVATE;
    const payload = { isActive: true };
    const { detail } = reducers(undefined, { type, payload });
    const expected = {
      isActive: true,
      tab: initialState.tab
    };
    expect(detail.isActive).toEqual(expected.isActive);
    expect(detail.tab).toEqual(expected.tab);
  });

  it('DETAIL_VIEW_ACTIVATE updates `isActive` to false', () => {
    const type = actions.DETAIL_VIEW_ACTIVATE;
    let isActive = true;
    let { detail } = reducers(undefined, { type, payload: { isActive } });
    expect(detail.isActive).toEqual(isActive);
    expect(detail.tab).toEqual(initialState.tab);
    isActive = false;
    detail = reducers(undefined, { type, payload: { isActive } }).detail;
    expect(detail.isActive).toEqual(isActive);
    expect(detail.tab).toEqual(initialState.tab);
  });
});
