
export const trendResource = '/VcfoTrendPlannerRequest';

const trendSort = (a, b) =>
  a.month - b.month;

const trendMonthMap = dto => ({
  account: dto.accountNumber,
  key: dto.customerKey,
  month: dto.planMonth,
  year: dto.planYear,
  actualNet: dto.actualNet, // "Net" tab
  actualTotalPay: dto.actualTotPay, // "Out" tab
  actualTotalReceived: dto.actualTotRec, // "In" tab
  plannedPay: dto.totPayOverride, // Planned "Out"
  plannedReceived: dto.totRecOverride // Planned "In"
});

export const trendMap = dto => ({
  year: dto.plannerYear,
  months: dto.vcfoTrendDataList
    .map(trendMonthMap)
    .sort(trendSort)
});

export const trendsMap = dto => dto.vcfoTrendPlannerByYear.map(trendMap);
