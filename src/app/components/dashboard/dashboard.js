import angular from 'angular';
import { layout } from './layout/layout';
import { layoutMobile } from './layout-mobile/layout-mobile';
import { detailView } from './detail/detail-view';
import { detailMobile } from './detail-mobile/detail-mobile';
import { dashboardComponent } from './dashboard.component';

/**
 * The dashboard module is the core of the experience and contains the
 * account selector, the mega area, the help & settings menu, and the
 * dashboard widget layout. The module also defines the routes for most
 * of the application.
 * @see See `app/config/uirouter.config.js` for @uirouter/angularjs state
 * definitions.
 */
export const dashboard = angular
  .module('cfi.components.dashboard', [
    layout.name,
    layoutMobile.name,
    detailView.name,
    detailMobile.name
  ])
  .component('dashboard', dashboardComponent);
