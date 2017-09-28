import angular from 'angular';
import { megaHeader } from './mega-header/mega-header';
import { fabMenu } from './fab-menu/fab-menu';
import { accounts } from './accounts/accounts';

export const common = angular.module('cfi.components.common', [
  megaHeader.name,
  fabMenu.name,
  accounts.name
]);
