import 'babel-polyfill';
import angular from 'angular';
import ngMaterial from 'angular-material';
import ngRedux from 'ng-redux';
import uiRouter from '@uirouter/angularjs';
import wbbUiBase from '../../wbb-ui-base';

import { config } from './config/config';
import { shared } from './shared';
import { charts } from './charts/charts';
import { components } from './components/components';
import { appComponent } from './app.component';

angular.module('cfi', [
  ngMaterial,
  ngRedux,
  uiRouter,
  wbbUiBase.name,
  config.name,
  shared.name,
  charts.name,
  components.name
])
.component('app', appComponent);
