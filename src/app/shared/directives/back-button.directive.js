/**
 * Simple attribute directive for adding "history.back" functionality
 * to an element declaratively.
 * @param {Object} window The Angular wrapper service for `window` object.
 * @example
 * <button back-button>Back</button>
 */
export const backButtonDirective = $window => {
  'ngInject';

  const link = (scope, elem) => {
    elem.bind('click', () => {
      $window.history.back();
    });
  };

  return {
    restrict: 'A',
    link
  };
};
