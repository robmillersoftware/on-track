export default class SpendAnalysisWidgetController {
  constructor($ngRedux, SpendAnalysisActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = SpendAnalysisActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  $postLink() {
    this.fetchSpendingPreview();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    const { preview } = state.spendAnalysis;
    return {
      ...preview
    };
  }
}
