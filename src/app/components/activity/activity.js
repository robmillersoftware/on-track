import angular from 'angular';
import { searchableTransactions } from
  './searchable-transactions/searchable-transactions';
import { transactionsTable } from './transactions-table/transactions-table';
import { transactionsTools } from './transactions-tools/transactions-tools';
import { onlineStatements } from './online-statements/online-statements';
import { ActivityActions } from './activity.actions';
import { ActivityViewActions } from './activity-view.actions';
import { OnlineStatementsActions } from './online-statements.actions';
import { activityComponent } from './activity.component';
import { activityWidget } from './activity-widget/activity-widget';
import { activityAdditionalInfo } from
  './activity-additional-info/activity-additional-info';

export const activity = angular.module('cfi.components.activity', [
  searchableTransactions.name,
  transactionsTable.name,
  transactionsTools.name,
  activityWidget.name,
  activityAdditionalInfo.name,
  onlineStatements.name
])
.service('ActivityActions', ActivityActions)
.service('ActivityViewActions', ActivityViewActions)
.service('OnlineStatementsActions', OnlineStatementsActions)
.component('activity', activityComponent);
