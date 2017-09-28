import controller from './cashflow-chart.controller';
import template from './cashflow-chart.html';

export const cashflowChart = {
  template,
  controller,
  bindings: {
    cashflow: '<?'
  }
};
