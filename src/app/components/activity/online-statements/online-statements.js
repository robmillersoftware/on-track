import angular from 'angular';
import { onlineStatementsComponent } from './online-statements.component';

export const onlineStatements =
  angular.module('cfi.components.online-statements', [])
    .component('onlineStatements', onlineStatementsComponent);
