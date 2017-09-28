import angular from 'angular';
import infrastructure from './infrastructure';
import Account from './Account.service.js';
import Accounts from './Accounts.service';
import Activity from './Activity.service';
import BillDotComAccess from './BillDotComAccess.service';
import Cashflow from './Cashflow.service';
import Entitlements from './Entitlement.service';
import Settings from './Settings.service';
import Transactions from './Transactions.service';
import SpendAnalysis from './SpendAnalysis.service';
import DailyTracker from './DailyTracker.service';
import Trend from './Trend.service';

export const domain = angular.module('cfi.domain', [
  infrastructure.name
])
.service('AccountService', Account)
.service('AccountsService', Accounts)
.service('ActivityService', Activity)
.service('BillDotComAccess', BillDotComAccess)
.service('CashflowService', Cashflow)
.service('EntitlementsService', Entitlements)
.service('SettingsService', Settings)
.service('TransactionsService', Transactions)
.service('SpendAnalysisService', SpendAnalysis)
.service('DailyTrackerService', DailyTracker)
.service('TrendService', Trend);
