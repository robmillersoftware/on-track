export const dailyTrackerPreviewResource = '/VcfoDailyTrackerQuickviewRequest';

export const dailyTrackerMap = dto => ({
  dailyGoal: dto.dailyGoal,
  currentRevenue: dto.currentRevenue
});
