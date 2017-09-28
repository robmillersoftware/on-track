import * as actions from './activity-view.actions';
import * as activityActions from './activity.actions';

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

export const viewActivity = (state = initialState, { type, payload }) => {
  switch (type) {

    case activityActions.ACTIVITY_FETCH_SUCCESS:
      return Object.assign({}, state, { list: payload.transactions });

    case actions.ACTIVITY_VIEW_SORT_CHANGE:
      return Object.assign({}, state, {
        list: payload.list,
        sort: payload.criteria
      });

    case actions.ACTIVITY_VIEW_FILTER_CHANGE:
      return Object.assign({}, state, payload);

    case actions.ACTIVITY_VIEW_SHOW_NUMBER:
      return Object.assign({}, state, { showing: payload });

    case actions.ACTIVITY_VIEW_LOAD_MORE:
      return Object.assign({}, state,
        { showing: Math.min(state.list.length, state.showing + payload) });

    case actions.ACTIVITY_VIEW_TOGGLE_ADVANCED:
      return Object.assign({}, state,
        { showAdvancedSearch: !state.showAdvancedSearch });

    default:
      return state;
  }
};
