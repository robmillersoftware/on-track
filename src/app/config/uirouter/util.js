import {
  changeDetailTab,
  showDetail
} from '../../components/dashboard/dashboard.actions';

/**
 * Transitions to a uirouter state in the dashboard detail view.
 * @param {Object} transition$ The @uirouter/angularjs transition service.
 * @param {Object} state$ The @uirouter/angularjs state service.
 * @param {Object} ngRedux The redux store.
 */
export const transitionToDetail = ($transition$, $state$, $ngRedux) => {
  'ngInject';
  $ngRedux.dispatch(changeDetailTab($state$.name));
  $ngRedux.dispatch(showDetail());
  return false;
};

export const transitionToDetailMobile = key =>
  (detailMobileService) => {
    'ngInject';
    detailMobileService.openDetail(key);
    return false;
  };

/**
 * Returns true if app currently loaded on small mobile device.
 */
export const isPhone = window.__env.DEBUG ?
  () => window.screen.width <= 600 :
  () => ((typeof window.orientation !== 'undefined') ||
    (navigator.userAgent.indexOf('IEMobile') !== -1)) &&
    window.screen.width <= 600;
