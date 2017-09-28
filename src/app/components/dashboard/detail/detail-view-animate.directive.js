import { element } from 'angular';
import { scrollTop } from '../../../shared/util';
/**
 * Helper element directive that adds animation behavior during the detail
 * view transitions. Namely, header area backdrop and scroll management.
 */
export const detailViewAnimateDirective = ($window) => {
  'ngInject';

  // dom references and scrollTop buffer
  let detailView;
  let backdrop;
  let _scrollTop;

  /**
   * Adds classes and sets scroll pos for backdrop mode.
   * @param {HTMLElement} view The 'view detail' DOM element.
   */
  const attach = view => {
    // defer for timing reasons
    setTimeout(() => element(view).addClass('opened'), 300);
    $window.scrollTo(0, 0);
    element($window.document.body).addClass('backdrop-visible');
  };

  /**
   * Removes backdrop mode classes.
   * @param {HTMLElement} view The 'view detail' DOM element.
   */
  const detach = view => {
    element($window.document.body).removeClass('backdrop-visible');
    element(view).removeClass('opened');
  };

  /**
   * Creates backdrop and scrolls to top.
   */
  const enter = () => {
    // save current scroll top so we can restore on hide()
    _scrollTop = scrollTop();

    // get dom references
    detailView = $window.document.querySelector('#dashboardDetail');
    backdrop = $window.document.querySelector('#backdrop');

    // attach classes
    attach(detailView);

    // show the backdrop
    setTimeout(() => (backdrop.style.opacity = 0.6), 0);

    // for ADA focus the detailView element and prevent scroll jump
    setTimeout(() => {
      detailView.focus();
      $window.scrollTo(0, 0);
    }, 300);
  };

  /**
   * Hides backdrop and restores previous scroll top.
   */
  const leave = () => {
    // restore prior scroll top
    $window.scrollTo(0, _scrollTop);
    // detach classes
    detach(detailView);
    // hide the backdrop
    backdrop.style.opacity = 0;
    setTimeout(() => {
      $window.scrollTo(0, _scrollTop);
      // TODO: Re-`focus()` the element that initiated the 'view detail'.
    }, 80);
  };

  /**
   * Watches `toggle` binding and calls `enter` and `leave` when appropriate.
   * @param {Object} scope Our isolate scope.
   */
  const link = (scope) => {
    let prevValue = false;
    scope.$watch('toggle', value => {
      if (value) {
        enter();
        prevValue = true;
      } else if (prevValue) {
        leave();
        prevValue = false;
      }
    });
  };

  return {
    restrict: 'E',
    scope: {
      toggle: '<'
    },
    link
  };
};
