/**
 * Controller for timeline container component.
 */
export default class TimelineController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} $ngRedux The application store.
   * @param {Object} TimelineActions actions called when
   * user interacts with timeline UI.
   */
  constructor($ngRedux, TimelineActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = TimelineActions;
  }

  /**
   * Binds actions to controller instance.
   */
  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  /**
   * Unsubscribes redux store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * $postLink Function - Called when DOM is ready and we know the timeline
   * actions will return an instance
   *
   * @returns {undefined} No [Explicit] Return
   */
  $postLink() {
    this.getCashflow();
  }

  /**
   * Maps the `timelineChart` and `activity` objects
   * to our component - `$ctrl`.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const { timeline } = state;
    return {
      ...timeline
    };
  }
}
