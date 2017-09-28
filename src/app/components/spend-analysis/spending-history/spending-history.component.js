import template from './spending-history.html';

// temporary throwaway controller. TODO: delete me
// the D3 spending history chart/component will deal with this
// in the future (in a cleaner way)
const controller = () => ({
  $onChanges() {
    if (!this.history) return;
    this.history = this.history.reduce((a, x) => {
      if (!a[x.key]) {
        a[x.key] = { key: x.key, amount: 0 };
      }
      a[x.key].amount += x.amount;
      return a;
    }, {});
  }
});

export const spendingHistoryComponent = {
  template,
  controller,
  bindings: {
    history: '<',
    onSelectMonth: '&'
  }
};
