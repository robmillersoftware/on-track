import * as actions from './online-statements.actions';

// TODO: Find a real data source for online statements, set up actions to fetch
// from that source.

const initialState = {
  years: [
    {
      year: 2017,
      open: true,
      months: [
        { date: '07/31/2017', num: 7, name: 'July' },
        { date: '06/30/2017', num: 6, name: 'June' },
        { date: '05/31/2017', num: 5, name: 'May' },
        { date: '04/30/2017', num: 4, name: 'April' },
        { date: '03/31/2017', num: 3, name: 'March' },
        { date: '02/28/2017', num: 2, name: 'February' },
        { date: '01/31/2017', num: 1, name: 'January' }
      ]
    },
    {
      year: 2016,
      open: false,
      months: [
        { date: '12/31/2016', num: 12, name: 'December' },
        { date: '11/30/2016', num: 11, name: 'November' },
        { date: '10/31/2016', num: 10, name: 'October' },
        { date: '09/30/2016', num: 9, name: 'September' },
        { date: '08/31/2016', num: 8, name: 'August' },
        { date: '07/31/2016', num: 7, name: 'July' },
        { date: '06/30/2016', num: 6, name: 'June' },
        { date: '05/31/2016', num: 5, name: 'May' },
        { date: '04/30/2016', num: 4, name: 'April' },
        { date: '03/31/2016', num: 3, name: 'March' },
        { date: '02/29/2016', num: 2, name: 'February' },
        { date: '01/31/2016', num: 1, name: 'January' }
      ]
    }
  ],
  fetching: false,
  error: undefined
};

/**
 * Returns the given object with the specified year's open property set to
 *   the opposite of its present value.
 * @param years - An array containing data for years of monthly statements
 *   formatted as in the years property of the initial state above.
 * @param year - The year to set.
 * @returns {*} - A copy of the array passed, but with the open property for
 *   the given year set to the opposite of its present value.
 */
const toggleYear = (years, year) => {
  const copy = Array.isArray(years) ? years.slice() : [];
  copy.forEach(y => {
    if (y.year === year) {
      y.open = !y.open;
    }
  });
  return copy;
};

export const onlineStatements = (state = initialState,
  { type, payload }) => {
  switch (type) {
    case actions.ACCOUNT_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.ACCOUNT_FETCH_SUCCESS:
      return Object.assign({}, state, {
        account: payload.account,
        fetching: false
      });

    case actions.ACCOUNT_FETCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      });

    case actions.STATEMENTS_TOGGLE_YEAR:
      return Object.assign({}, state,
        { years: toggleYear(state.years, payload) });

    default:
      return state;
  }
};
