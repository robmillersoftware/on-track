import angular from 'angular';
import { accountsMenuComponent } from './accounts-menu.component';

export const accountsMenu = angular.module('cfi.components.accounts-menu', [])
.component('accountsMenu', accountsMenuComponent);
