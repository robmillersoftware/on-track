import template from './trend-preview.html';
import controller from './trend-preview.controller';

export const trendPreview = {
  template,
  controller,
  bindings: {
    years: '<'
  }
};
