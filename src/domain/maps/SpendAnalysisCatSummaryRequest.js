const spendingSubcategoriesMap = dto =>
  Object.keys(dto).reduce((acc, key) => {
    acc[key] = {
      amount: dto[key].totalCatAmount,
      percent: dto[key].totalCatpercent,
      count: dto[key].totalCatCount,
      categoryId: dto[key].yodleeCategoryId,
      name: dto[key].vendorCategoryName
    };
    return acc;
  }, {});

const spendingCategoriesMap = dto =>
  Object.keys(dto).reduce((acc, key) => {
    acc[key] = {
      amount: dto[key].totalPncAmount,
      percent: dto[key].categoryPercent,
      categoryId: dto[key].pncCategoryId,
      name: dto[key].displayName,
      subcategories: spendingSubcategoriesMap(dto[key].yodleeCategoryMap)
    };
    return acc;
  }, {});

const getYear = data => parseInt(data.slice(0, 4), 10);
const getMonth = data => parseInt(data.slice(4), 10);

export const transactionYearMonthMap = dto =>
  Object.keys(dto).reduce((acc, key) => {
    acc[key] = {
      totalAmount: dto[key].pncTotalMonthlyAmount,
      yearMonth: dto[key].yearMonthKey,
      year: getYear(dto[key].yearMonthKey),
      month: getMonth(dto[key].yearMonthKey),
      all: spendingCategoriesMap(dto[key].pncCategoriesMapping)
    };
    return acc;
  }, {});

// Functions for building the history totals list:

const toArray = graph =>
  Object.keys(graph)
    .map(key => graph[key]);

export const totalsFromSpending = spending => Object.keys(spending)
  .map(key => toArray(spending[key].all)
    .map(category =>
      [].concat(category, toArray(category.subcategories)))
    .reduce((acc, val) => acc.concat(val), [])
    .map(category => ({
      key,
      categoryId: category.categoryId,
      amount: category.amount
    }))
    .reduce((acc, val) => acc.concat(val), []))
  .reduce((acc, val) => acc.concat(val), [])
  .filter(category => category.amount > 0);
