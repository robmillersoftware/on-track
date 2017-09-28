export const spendPreviewResource = '/VcfoSpendAnalysisQuickviewRequest';

export const categoryListMap = dto => ({
  category: dto.name,
  percent: dto.percent,
  amount: dto.total // TODO: confirm this field has been added to DTO
});
