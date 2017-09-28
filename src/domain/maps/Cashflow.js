import { epochToDate } from '../util';
import {
  TRANSACTION_STATUS,
  TRANSACTION_TYPE
} from '../constants/Transactions';

// The backend API endpoint
export const cashflowResource = '/VcfoCashflow';

// DTO -> Domain mapping functions

const healthIndicatorsMap = dto => ({
  billPayStatus: dto.custLevelBillPayStatus,
  hasAutoDebits: !!dto.hasAutoDebits,
  hasAvailablePendingTransactions: !!dto.hasAvailablePendingTransactions,
  hasAvailablePostedTransactions: !!dto.hasAvailablePostedTransactions,
  hasAvailableScheduledBills: !!dto.hasAvailableScheduledBills,
  hasAvailableTransfers: !!dto.hasAvailableTransfers,
  hasBillDotComData: !!dto.hasBillDotComData,
  hasCategorizationFunction: !!dto.hasCategorizationFunction,
  hasCategorizationService: !!dto.hasCategorizationService,
  hasChecksYouWrote: !!dto.hasChecksYouWrote,
  hasProformasMoneyIn: !!dto.hasProformasMoneyIn,
  hasProformasMoneyOut: !!dto.hasProformasMoneyOut,
  hasRecurringExternalPayments: !!dto.hasRecurringExternalPayments,
  hasRecurringExternalTransfers: !!dto.hasRecurringExternalTransfers,
  hasScheduledExternalPayments: !!dto.hasScheduledExternalPayments,
  hasScheduledExternalTransfers: !!dto.hasScheduledExternalTransfers,
  hasSpendAnalysisSummary: !!dto.hasSpendAnalysisSummary,
  hasSpendAnalysisTransactions: !!dto.hasSpendAnalysisTransactions,
  isBillPayUnAvailable: !!dto.isBillPayUnAvailable
});

const transactionMap = dto => ({
  date: epochToDate(dto.transactionDate),
  dueDate: epochToDate(dto.dueDate),
  description: dto.description,
  description2: null, // ??
  cashIn: dto.credit ? dto.totalAmount : undefined,
  cashOut: dto.debit ? dto.totalAmount : undefined,
  balance: dto.currentBalance,
  credit: dto.credit,
  debit: dto.debit,
  recurring: dto.recurring,
  scheduled: dto.scheduled,
  status: dto.status,
  statusInfo: TRANSACTION_STATUS[dto.status],
  amount: dto.totalAmount,
  key: dto.transactionKey,
  type: dto.transactionType,
  typeInfo: TRANSACTION_TYPE[dto.transactionType]
});

const transactionByDateMap = dto => ({
  date: epochToDate(dto.tranDate),
  endingBalance: dto.endingBalance,
  netUnapproved: dto.totalUnApprovedNet,
  transactions: dto.vcfoTransactions.map(transactionMap)
});

// maybe doesn't belong here.
// possibly refactor to redux action creator level when
// it's needed
const viewOptionsMap = selected =>
  (selected.length > 0 ? {
    show: true,
    from: selected[selected.length - 1].date,
    to: selected[0].date
  } :
  { show: false });

/**
 * Returns an array of all of the transactions in the data argument, which
 * organizes transactions by date.
 * @param data The data object from the API.
 * @return An array of all of the transactions in the data argument.
 */
export const getTransactions = data => {
  const transactions = [];
  data.forEach(day => {
    day.transactions.forEach(transaction => {
      transactions.push(transaction);
    });
  });
  return transactions;
};

export const cashflowMap = dto => {
  const transactionsByDate = dto.vcfoTransactionsByDateList
    .map(transactionByDateMap)
    .reverse();
  const transactions = getTransactions(transactionsByDate);
  return {
    account: {
      id: dto.accountId.accountNumberFormatted,
      type: dto.accountId.accountType,
      indicators: healthIndicatorsMap(dto.healthIndicators)
    },
    cashflow: {
      all: transactionsByDate,
      selected: transactionsByDate.slice(0),
      transactions: {
        all: transactions,
        selected: transactions.slice(0)
      },
      options: viewOptionsMap(transactionsByDate)
    }
  };
};
