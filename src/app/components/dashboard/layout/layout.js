import angular from 'angular';
import { accountSummary } from './account-summary/account-summary';
import { widgetCard } from './widget-card/widget-card';
import { offers } from './offers/offers';
import { layoutComponent } from './layout.component';

export const layout = angular
  .module('cfi.components.dashboard.layout', [
    accountSummary.name,
    widgetCard.name,
    offers.name
  ])
  .component('layout', layoutComponent);
