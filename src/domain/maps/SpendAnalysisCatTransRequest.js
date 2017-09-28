import { epochToDate } from '../util';

export const transactionMap = dto => ({
  id: dto.yodleeTranId,
  date: epochToDate(dto.postDate),
  description: dto.transactionDesc1,
  amount: dto.transactionAmount,
  category: {
    categoryId: dto.pncCatId,
    name: dto.pncCatDisplayName
  },
  subcategory: {
    categoryId: dto.yodleeCatId,
    name: dto.yodleeDisplayName.replace(' > ', '')
  }
});
