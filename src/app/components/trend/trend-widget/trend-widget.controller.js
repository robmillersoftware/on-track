export default class TrendWidgetController {
  constructor($ngRedux, TrendActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = TrendActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  $postLink() {
    this.fetchTrend();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    const { trend } = state;
    return {
      trend
    };
  }
}
