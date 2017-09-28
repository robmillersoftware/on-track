export default class ActivityWidgetController {
  constructor($ngRedux, ActivityActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = ActivityActions;
  }

  /**
   * Binds actions to controller instance
   */
  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  /**
   * $postLink Function - Called when DOM is ready and we know the activity
   * actions will return an instance
   *
   * @returns {undefined} No [Explicit] Return
   */
  $postLink() {
    this.fetchActivity();
  }

  /**
   * Unsubscribes redux store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * Maps the 'activity` object to our component - `$ctrl`.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const { activity } = state;
    return {
      activity
    };
  }
}
