export default class SpendAnalysisController {
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
    this.spendAnalysisInit();
  }

  mapStateToThis(state) {
    return {
      ...state.spendAnalysis
    };
  }

  selectMonthWithTransactions(yearMonth) {
    this.selectMonth(yearMonth);
    this.fetchTransactions(yearMonth);
  }
}
