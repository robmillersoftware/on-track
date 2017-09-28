import { commonReducers } from './common/reducers';
import * as dashboard from './dashboard/dashboard.reducers';
import * as activity from './activity/activity.reducers';
import * as viewActivity from './activity/activity-view.reducers';
import * as account from './activity/account.reducers';
import * as onlineStatements from './activity/online-statements.reducers';
import * as timeline from './timeline/timeline.reducers';
import * as spending from './spend-analysis/spend-analysis.reducers';
import * as settings from './settings/settings.reducers';
import * as routingInfo
  from './show-routing-info/show-routing-info.reducers';
import * as spendAnalysis from './spend-analysis/spend-analysis.reducers';
import * as trend from './trend/trend.reducers';
import * as billDotComAccess
  from './bill-dot-com-access/bill-dot-com-access.reducers';
import * as entitlements from './entitlements/entitlements.reducers';

/**
 * Combine everything in single root reducer and export.
 */
export const reducers = {
  ...commonReducers,
  ...dashboard,
  ...activity,
  ...viewActivity,
  ...account,
  ...onlineStatements,
  ...timeline,
  ...spending,
  ...settings,
  ...routingInfo,
  ...spendAnalysis,
  ...trend,
  ...billDotComAccess,
  ...entitlements
};
