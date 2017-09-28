import { epochToDate } from '../util';

export const activityResource = '/VcfoDepositActivity';

const transactionMap = dto => ({
  date: epochToDate(dto.postDate), // do we need effectDate too?
  dueDate: dto.effectDate !== dto.postDate ?
    epochToDate(dto.effectDate) : undefined, // ??
  description: dto.transactionDesc1, // or masked Desc? does Desc2 matter?
  description2: dto.transactionDesc2,
  cashIn: dto.credit ? dto.transactionAmount : undefined,
  cashOut: dto.debit ? dto.transactionAmount : undefined,
  balance: dto.currentBalance,
  checkNumber: dto.checkNumber,
  isCheck: dto.check
});

const accountMap = dto => ({
  id: dto.vcfoDepositAccountDto.accountId.accountNumberFormatted,
  description: dto.vcfoDepositAccountDto.accountProductDesc,
  type: dto.vcfoDepositAccountDto.accountTypeDesc,
  typeCode: dto.vcfoDepositAccountDto.accountType,
  nickname: dto.vcfoDepositAccountDto.nickname,
  textBankingNickname: dto.textBankingNickname,
  address: dto.address,
  number: dto.vcfoDepositAccountDto.accountNumber,
  availableBalance: dto.vcfoDepositAccountDto.availableBalance,
  ledgerBalance: dto.vcfoDepositAccountDto.ledgerBalance,
  interestLastYear: dto.vcfoDepositAccountDto.interestLastYear,
  interestThisYear: dto.vcfoDepositAccountDto.interestThisYear,
  lastDepositAmount: dto.vcfoDepositAccountDto.lastDepositAmount,
  lastDepositDate: epochToDate(dto.vcfoDepositAccountDto.lastDepositDate),
  lastStatementBalance: dto.vcfoDepositAccountDto.lastStatementBalance,
  lastStatementDate: epochToDate(dto.vcfoDepositAccountDto.lastStatementDate)
});

const pendingMap = dto => ({
  pendingWithdrawals: dto.pendingWithdrawals,
  pendingDeposits: dto.pendingDeposits,
});

const mergeTransactions = (posted, pending) =>
  posted.concat(pending).sort((a, b) => a.date - b.date);

export const activityMap = dto => ({
  account: Object.assign(
    accountMap(dto), pendingMap(dto)),
  sort: dto.sort, // ?? needed?
  filter: dto.filter, // ??
  transactions: mergeTransactions(
    dto.postedTransactions.map(transactionMap),
    dto.pendingTransactions.map(transactionMap))
});
