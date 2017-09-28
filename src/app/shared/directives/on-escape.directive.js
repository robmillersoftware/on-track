const ESCAPE_KEY_CODE = 27;

/**
 * Evaluates an express when escape key is pressed from within
 * target element.
 * @example
 * <my-element on-escape="$ctrl.someMethod()"></my-element>
 */
export const onEscapeDirective = () => {
  'ngInject';

  const link = (scope, elem) => {
    elem.on('keyup', e => {
      if (e.keyCode === ESCAPE_KEY_CODE) {
        scope.escape.call(elem);
      }
    });
  };

  return {
    restrict: 'A',
    link,
    scope: {
      escape: '&onEscape'
    }
  };
};
