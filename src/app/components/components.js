import angular from 'angular';
import { domain } from '../../domain';
import { common } from './common/common';
import { timeline } from './timeline/timeline';
import { dashboard } from './dashboard/dashboard';
import { trend } from './trend/trend';
import { activity } from './activity/activity';
import { spendAnalysis } from './spend-analysis/spend-analysis';
import { cashIn } from './cash-in/cash-in';
import { cashOut } from './cash-out/cash-out';
import { help } from './help/help';
import { settings } from './settings/settings';
import {
  showRoutingInfo
} from './show-routing-info/show-routing-info';

export const components = angular.module('cfi.components', [
  domain.name,
  common.name,
  timeline.name,
  dashboard.name,
  showRoutingInfo.name,
  trend.name,
  activity.name,
  spendAnalysis.name,
  cashIn.name,
  cashOut.name,
  showRoutingInfo.name,
  help.name,
  settings.name
]);
