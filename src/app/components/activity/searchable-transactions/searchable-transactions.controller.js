/**
 * Searchable transactions controller. Controls the searchable component
 * for the transactions table.
 */
export default class SearchableTransactionsController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} $ngRedux The `ngRedux` state container service.
   * @param {Object} ActivityViewActions The redux actions for working with
   * transactions activity.
   */
  constructor($ngRedux, ActivityViewActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = ActivityViewActions;
    this.allFilters = [
      { name: 'Pending', value: 'pending' },
      { name: 'Posted', value: 'posted' },
      { name: 'Checks & eChecks', value: 'checks' },
      { name: 'Deposit', value: 'deposits' },
      { name: 'Withdrawal', value: 'withdrawals' }
    ];
    this.appliedFilters = [];
    this.allFormats = [
      { name: 'Quicken', ext: 'qfx', id: 2 },
      { name: 'Quickbooks', ext: 'qbo', id: 3 },
      { name: 'Microsoft Money', ext: 'ofx', id: 1 },
      { name: 'Microsoft Excel', ext: 'csv', id: 0 }
    ];
  }

  /**
   * Binds actions to controller instance, sets number
   * of transactions showing in transactions-table
   */
  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
    this.setNumberShowing(this.limitTo);
  }

  /**
   * Maps the 'viewActivity` objects to our component - `$ctrl`.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis = (state) => {
    const { viewActivity } = state;
    this.acctId = state.accounts.current.id;
    return {
      viewActivity
    };
  };

  /**
   * Calls activity actions with user entered query. Puts
   * string into object to call actions.
   * @param {string} query Limit the transactions to
   * query entered by user in search field.
   */
  onSearch = (query) => {
    this.filterActivity({ query });
  };

  isShowingAdvancedSearch = () => this.viewActivity.showAdvancedSearch;

  showAdvancedSearch = () => {
    if (!this.isShowingAdvancedSearch()) {
      this.toggleAdvancedSearch();
      this.onSearch('');
    }
  };

  hideAdvancedSearch = () => {
    if (this.isShowingAdvancedSearch()) {
      this.toggleAdvancedSearch();
      this.clearAdvancedSearch();
    }
  };

  /**
   * Calls activity actions with user selected query
   * @param {Object} filters Limit the transactions to
   * query selected from dropdowns by user in advanced search.
   */
  onAdvancedSearch = () => {
    this.filterActivity(this.advancedFields);
  };

  clearAdvancedSearch = () => {
    this.advancedFields = {
      date: {
        from: undefined,
        to: undefined
      },
      check: {
        from: undefined,
        to: undefined
      },
      amount: {
        from: undefined,
        to: undefined
      }
    };
    this.onAdvancedSearch();
  };

  onSelect = filter => {
    if (this.appliedFilters.indexOf(filter) < 0) {
      this.appliedFilters.push(filter);
      this.setFilters();
    }
  };

  onDeselect = filter => {
    const newFilters = [];
    this.appliedFilters.forEach(appliedFilter => {
      if (appliedFilter !== filter) {
        newFilters.push(appliedFilter);
      }
    });
    this.appliedFilters = newFilters;
    this.setFilters();
  };

  setFilters = () => {
    const filters = [];
    this.appliedFilters.forEach(filter => {
      filters.push(filter.value);
    });
    this.filterActivity(Object.assign({}, this.viewActivity.filter,
      { justShow: filters }));
  };

  onSort = () => {
    const criteria = this.sortOrder.split(' ');
    if (criteria.length > 1) {
      const direction = (criteria[1].toLowerCase().substr(0, 4) === 'desc') ?
        -1 : 1;
      const field = criteria[0].toLowerCase();
      this.sortActivity({ field, direction });
    }
  };

  onExport = () => {
    // Servlet uses ID's for filter options that do not appear to be used else-
    // where, so we can keep them in this function.
    //   1 = All Transactions
    //   2 = Only Deposits
    //   3 = Only Withdrawals
    //   4 = Only Checks
    let filter = 1;
    switch (this.viewActivity.filter.justShow) {
      case 'deposits': filter = 2; break;
      case 'withdrawals': filter = 3; break;
      case 'checks': filter = 4; break;
      default: break;
    }

    const path = 'https://onlinebanking-qa.pnc.com/alservlet/';
    const servlet = 'DepositAccountDetailExportServlet';
    const vars = {
      account: this.acctId,
      sort: 2,
      filter,
      view: 0,
      startIndex: 0,
      itemsPerPage: 999999,
      export: this.exportFormat
    };

    const keys = Object.keys(vars);
    const pairs = [];
    keys.forEach(key => {
      pairs.push(`${key}=${vars[key]}`);
    });
    const url = `${path}${servlet}?${pairs.join('&')}`;

    const form = document.querySelector('form.transactions-export-form');
    form.action = url;
    form.submit();
  };
}
