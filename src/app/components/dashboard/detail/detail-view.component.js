import template from './detail-view.html';
import controller from './detail-view.controller';

/**
 * Detail view component. Contains nav-bar that
 * registers currentTab using onTabChange()
 */
export const detailViewComponent = {
  template,
  controller,
  bindings: {
    isActive: '<',
    currentTab: '<',
    onDeactivate: '&',
    onTabChange: '&'
  }
};
