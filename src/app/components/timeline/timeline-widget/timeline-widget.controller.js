export default class TimelineWidgetController {
  constructor($ngRedux, TimelineActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = TimelineActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  $postLink() {
    this.getCashflow();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    const { timeline } = state;
    return {
      ...timeline
    };
  }
}
