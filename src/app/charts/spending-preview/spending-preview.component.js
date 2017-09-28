import template from './spending-preview.html';
import controller from './spending-preview.controller';

export const spendAnalysisPreview = {
  template,
  controller,
  bindings: {
    totals: '<'
  }
};
