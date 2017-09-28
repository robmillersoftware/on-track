import controller from './cashflow-preview.controller';

export const cashflowPreview = {
  template: `<div
    id="cashflow-preview"
    class="cashflow-preview"
    responsive-chart>
  </div>`,
  controller,
  bindings: {
    cashflow: '<'
  }
};
