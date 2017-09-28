/**
 * Trend container. Controls the trend component which
 * contains trend chart and table.
 */
export default class TrendController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} ngRedux The `ngRedux` state container service.
   * @param {Object} TrendActions The redux actions for working with
   * trend data
   */
  constructor($ngRedux, TrendActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = TrendActions;
  }

  /**
   * Binds actions to controller instance.
   */
  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
    this.tab = 'actualNet';

    const date = new Date();
    this.currentMonth = `0${date.getMonth() + 1}`.slice(-2);
    this.currentYear = date.getFullYear();
  }

  /**
   * $postLink Function - Called when DOM is ready and we know the trend
   * data will return an instance
   *
   * @returns {undefined} No [Explicit] Return
   */
  $postLink() {
    this.fetchTrend().then(() =>
      this.setTable());
  }

  /**
   * setTable Function - Called after trend data is loaded,
   * sets additonal variables for table data
   *
   * @returns {undefined} No [Explicit] Return
   */
  setTable() {
    /**
     * Sets total for each year in trend data by iterating over months
     * and adding actualNet total to the prior month, then checks to see if
     * the map is iterating over the last month. if so we set the total.
     *
     * Sets boolean values on each month which are referenced in the HTML
     * to show and hide <span> tags in the table based on these values
     */
    this.trendTable = this.trend.all.map(a => {
      const total = a.months
        .reduce((r, v) => r + v.actualNet, 0);

      const months = a.months.map(b => ({
        isFutureYear: b.year > this.currentYear,
        isFutureMonth: b.month > this.currentMonth,
        isFutureDate: (b.year >= this.currentYear) &&
          (b.month > this.currentMonth),
        isYearFutureMonth: b.year === this.currentYear &&
          (b.month > this.currentMonth),
        ...b
      }));

      return Object.assign({}, a, { months, total });
    });
  }

  $onDestroy() {
    this.unsubscribe();
  }

  toggleIsOpen(record) {
    this.toggleYear = record.year;
    this.isOpen = !this.isOpen;
  }

  /**
   * Maps the 'trend` object to our component - `$ctrl`.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const { trend } = state;
    return {
      trend
    };
  }
}
