import template from './spend-analysis-tools.html';

/**
 * spend-analysis-tools component for transactions in Spend
 * Analysis. Contains simple search type
 * field and sort and export.
 */
export const spendAnalysisToolsComponent = {
  template,
  bindings: {
    onSortChange: '&?',
    onSearch: '&?'
  }
};
