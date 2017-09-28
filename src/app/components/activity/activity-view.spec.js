import * as actions from './activity-view.actions.js';
import * as reducers from './activity-view.reducers.js';

let defaultAction;
let before;
const initialState = {
  list: [],
  showing: 40,
  showAdvancedSearch: false,
  filter: {},
  sort: {
    field: 'date',
    direction: 1
  }
};

describe('View Activity Reducers', () => {
  beforeEach(() => {
    defaultAction = { type: 'Not a valid action type' };
    before = reducers.viewActivity(undefined, defaultAction);
  });

  it('should return initial state by default', () => {
    expect(before).toEqual(initialState);
  });

  it('should return a state with sort criteria when sorted', () => {
    const sort = {
      list: [],
      criteria: { a: 1, b: 2, c: 3 }
    };
    const activity = reducers.viewActivity(before, {
      type: actions.ACTIVITY_VIEW_SORT_CHANGE,
      payload: sort
    });
    const expected = {
      list: [],
      showing: 40,
      showAdvancedSearch: false,
      filter: {},
      sort: sort.criteria
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });

  it('should return a state with filter criteria when filtered', () => {
    const filter = { query: 'string' };
    const activity = reducers.viewActivity(before, {
      type: actions.ACTIVITY_VIEW_FILTER_CHANGE,
      payload: {
        filter,
        list: [1, 2, 3]
      }
    });
    const expected = {
      list: [1, 2, 3],
      showing: 40,
      showAdvancedSearch: false,
      filter,
      sort: {
        field: 'date',
        direction: 1
      }
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });

  it('should return a state showing the specified number' +
    'when requested', () => {
    const activity = reducers.viewActivity(before, {
      type: actions.ACTIVITY_VIEW_SHOW_NUMBER,
      payload: 10
    });
    const expected = {
      list: [],
      showing: 10,
      showAdvancedSearch: false,
      filter: {},
      sort: {
        field: 'date',
        direction: 1
      }
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });

  it('should return a state that increments the number shown correctly' +
    'when requested', () => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      list[i] = 1;
    }
    const activity = reducers.viewActivity({
      list,
      showing: 20
    }, {
      type: actions.ACTIVITY_VIEW_LOAD_MORE,
      payload: 20
    });
    const expected = {
      list,
      showing: 40
    };

    expect(before).toEqual(initialState);
    expect(activity).toEqual(expected);
  });

  it('should show the advanced search form when toggled from false', () => {
    const activity = reducers.viewActivity({
      showAdvancedSearch: false
    }, {
      type: actions.ACTIVITY_VIEW_TOGGLE_ADVANCED
    });
    const expected = {
      showAdvancedSearch: true
    };

    expect(activity).toEqual(expected);
  });

  it('should not show the advanced search form when toggled from true', () => {
    const activity = reducers.viewActivity({
      showAdvancedSearch: true
    }, {
      type: actions.ACTIVITY_VIEW_TOGGLE_ADVANCED
    });
    const expected = {
      showAdvancedSearch: false
    };

    expect(activity).toEqual(expected);
  });
});
