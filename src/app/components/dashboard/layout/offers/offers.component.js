import template from './offers.html';

/**
 * Offers component. Contains 'dumb' offers
 * template that shows array of passed offers.
 */
export const offersComponent = {
  template,
  bindings: {
    offers: '<'
  }
};
