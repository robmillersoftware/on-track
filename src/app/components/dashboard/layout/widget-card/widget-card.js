import angular from 'angular';
import { widgetCardComponent } from './widget-card.component';

export const widgetCard = angular.module('cfi.components.widget-card', [])
.component('widgetCard', widgetCardComponent);
