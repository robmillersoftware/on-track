export default class DailyTrackerWidgetController {
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
    this.fetchDailyTrackerPreview();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    const { preview } = state.dailyTracker;
    return {
      ...preview
    };
  }
}
