import template from './mega-header.html';

/**
 * Mega header component. Contains dynamic
 * welcome message.
 */
export const megaHeaderComponent = {
  template,
  bindings: {
    message: '<'
  }
};
