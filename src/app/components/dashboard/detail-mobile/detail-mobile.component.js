import template from './detail-mobile.html';
import controller from './detail-mobile.controller';

/**
 * Detail component for mobile (smartphone).
 */
export const detailMobileComponent = {
  template,
  controller,
  bindings: {
    view: '@'
  }
};
