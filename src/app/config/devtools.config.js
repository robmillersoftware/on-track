export const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? [
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
] : [];

export const devtoolsRun = window.__REDUX_DEVTOOLS_EXTENSION__ ?
  ($ngRedux, $rootScope, $timeout) => {
    'ngInject';
    // To reflect state changes when disabling/enabling actions via the monitor
    // there is probably a smarter way to achieve this.
    // We will exclude all of this in production anyway.
    $ngRedux.subscribe(() => {
      $timeout(() => ($rootScope.$apply(() => {})), 160);
    });
  } : () => undefined;
