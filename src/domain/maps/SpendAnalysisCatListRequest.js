const categoryMap = dto => ({
  categoryId: dto.categoryId,
  name: dto.categoryName
});

const subcategoryMap = dto => ({
  categoryId: dto.categoryId,
  name: dto.displayName
});

export const combineCategories = dto => ({
  ...categoryMap(dto.pncCategoryData),
  subcategories: dto.yodleeCategoryData.map(subcategoryMap)
});
