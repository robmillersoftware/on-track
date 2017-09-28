export const entitlementResource = '/VcfoEntitlementRequest';

const dashboardMap = dto => ({
  access: dto.pageAccess,
  timeline: dto.timelineAccess,
  trend: dto.trendAccess,
  welcome: dto.welcomeAccess,
  help: dto.helpAccess
});

const timelineMap = dto => ({
  access: dto.pageAccess,
  modifyCashCushion: dto.modifyCashCushion,
  cashInCustomerViewOnly: dto.cashInCustomerViewOnly,
  cashInItemsViewOnly: dto.cashInItemsViewOnly,
  cashOutPayeeViewOnly: dto.cashOutPayeeViewOnly,
  cashOutItemsViewOnly: dto.cashOutItemsViewOnly
});

const trendMap = dto => ({
  access: dto.pageAccess,
  graph: dto.trendGraph,
  dataOnly: dto.trendDataViewOnly,
  percentageHandleViewOnly: dto.percentageHandleViewOnly,
  planDotsViewOnly: dto.planDotsViewOnly,
  togglePlan: dto.togglePlan,
  navigateTabs: dto.navigateTabs
});

const cashInMap = dto => ({
  access: dto.pageAccess,
  cashInCustomerViewOnly: dto.cashInCustomerViewOnly,
  cashInItemsViewOnly: dto.cashInItemsViewOnly
});

const cashOutMap = dto => ({
  access: dto.pageAccess,
  cashOutPayeeViewOnly: dto.cashOutPayeeViewOnly,
  cashOutItemsViewOnly: dto.cashOutItemsViewOnly
});

const activityMap = dto => ({
  access: dto.pageAccess
});

const billDotComMap = dto => ({
  access: dto.pageAccess
});

const preferencesMap = dto => ({
  access: dto.pageAccess
});

export const entitlementMap = dto => ({
  dashboard: dashboardMap(dto.dashboardEntitlements),
  timeline: timelineMap(dto.timelineEntitlements),
  trend: trendMap(dto.trendEntitlements),
  cashIn: cashInMap(dto.cashInEntitlements),
  cashOut: cashOutMap(dto.cashOutEntitlements),
  activity: activityMap(dto.activityEntitlements),
  billDotCom: billDotComMap(dto.billDotComEntitlements),
  preferences: preferencesMap(dto.preferencesEntitlements),
  delegationAccountFunctionPrivilege: dto.delegationAccountFunctionPrivilege,
  delegate: dto.delegate
});
