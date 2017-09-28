import template from './mobile-menu.html';
import controller from './mobile-menu.controller';

/**
 * Activity menu for mobile (smartphone). This
 * will be the only menu in the mobile app.
 */
export const mobileMenuComponent = {
  template,
  controller,
  bindings: {
    openDetail: '&'
  }
};
