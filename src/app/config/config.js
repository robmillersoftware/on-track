import angular from 'angular';
import { materialConfig } from './material.config';
import { ariaConfig } from './aria.config';
import { reduxConfig } from './redux.config';
import { uiRouterConfig } from './uirouter.config';
import { devtoolsRun } from './devtools.config';

export const config = angular.module('cfi.config', [
  'icons'
])
.config(ariaConfig)
.config(materialConfig)
.config(reduxConfig)
.config(uiRouterConfig)
.config($qProvider => {
  'ngInject';
  $qProvider.errorOnUnhandledRejections(false);
})
.run(devtoolsRun);
