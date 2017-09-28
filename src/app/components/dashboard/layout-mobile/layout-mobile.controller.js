export default class LayoutMobileController {
  constructor($ngRedux, $mdUtil, MobileActions, detailMobileService) {
    'ngInject';
    this.store = $ngRedux;
    this.$mdUtil = $mdUtil;
    this.actions = MobileActions;
    this.detailMobileService = detailMobileService;
  }

  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe =
      this.store.connect(this.mapStateToThis.bind(this), actions)(this);

    const date = new Date();
    this.currentMonth = (`0${(date.getMonth() + 1)}`).slice(-2);
    this.currentYear = date.getFullYear();
  }

  getInitialState(isHydrated) {
    if (!this.ready && isHydrated) {
      this.ready = true;
      this.$mdUtil.nextTick(() => this.loadDashboard()
        .then(() => this.setSummaryPoints(this)));
    }
  }

  setSummaryPoints() {
    if (!this.all) return;

    this.all
      .filter(t => t.year === this.currentYear)
      .forEach(t => {
        t.months.forEach(m => {
          if ((`0${m.month}`) === this.currentMonth) {
            this.summaryTrend = m;
          }
        });
      });

    const plannedNet =
      this.summaryTrend.plannedReceived - this.summaryTrend.plannedPay;
    this.summaryTrend.plannedPercent =
      (this.summaryTrend.actualNet / plannedNet)
      .toString().slice(0, 4);
  }

  openDetail(item) {
    this.detailMobileService.openDetail(item);
  }

  mapStateToThis(state) {
    const activity = state.activity || {};
    const { isHydrated } = state.accounts;
    // I suppose we need stories for getting pre-computed summaries?
    // The spend analysis `preview` may be okay but `cashflow` and
    // `all` need to be summarized.
    const { cashflow } = state.timeline || {};
    const { preview } = state.spendAnalysis || {};
    const { all } = state.trend || {};
    this.getInitialState(isHydrated);
    return {
      activity,
      cashflow,
      preview,
      all
    };
  }
}
