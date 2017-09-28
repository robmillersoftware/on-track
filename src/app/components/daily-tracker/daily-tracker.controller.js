export default class DailyTrackerController {
  constructor($ngRedux, DailyTrackerActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = DailyTrackerActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  $postLink() {
  }

  mapStateToThis(state) {
    return {
      ...state.dailyTracker
    };
  }
}
