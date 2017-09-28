/**
 * List of objects representing CFI transaction statuses where the
 * index of the object List of objects representing CFI transaction to the
 * integer status code.
 * For example, `TRANSACTION_STATUS[0]` would be:
 * This is adapted from the legacy code.
 *  `{ text 'Posted', projected: 0 }`
 * The `projected` field can be used to organize transactions by their
 * projected / uncommitted state, i.e., for the Timeline chart.
 * This is taken almost verbatim from the legacy CFI code.
 * @example
 * const status = TRANSACTION_STATUS[transactionDto.status];
 */
export const TRANSACTION_STATUS = [
  {
    text: 'Posted',
    projected: 0
  },
  {
    text: 'Pending',
    projected: 0
  },
  {
    text: 'Scheduled',
    projected: 0
  },
  {
    text: 'Uncommitted',
    projected: 1
  },
  {
    text: 'Confirm',
    projected: 0
  },
  {
    text: 'Unconfirmed ',
    projected: 0
  },
  {
    text: 'Processed',
    projected: 0
  },
  {
    text: 'Committed',
    projected: 0
  },
];

/**
 * List of objects representing CFI transaction types.
 * The index and `id` field map to `vcfoTransactions.transactionType`.
 * This is adapted from the legacy code.
 * @example
 * const transType = TRANSACTION_TYPE[vcfoTransaction.transactionType];
 */
export const TRANSACTION_TYPE = [
  {
    id: 0,
    key: 'HISTORY_TRANSACTION',
    label: ''
  },
  {
    id: 1,
    key: 'MEMO_TRANSACTION',
    label: 'Memo Transaction'
  },
  {
    id: 2,
    key: 'INTERNAL_TRANSFER',
    label: 'Transfer'
  },
  {
    id: 3,
    key: 'EXTERNAL_TRANSFER',
    label: 'External Transfer'
  },
  {
    id: 4,
    key: 'POP_MONEY',
    label: 'POP Money'
  },
  {
    id: 5,
    key: 'BILL_PAYMENT',
    label: 'Online'
  },
  {
    id: 6,
    key: 'CHECK_YOU_WROTE',
    label: 'Check'
  },
  {
    id: 7,
    key: 'AUTO_DEBIT',
    label: 'Auto Debit'
  },
  {
    id: 8,
    key: 'PROFORMA_MONEY_OUT',
    label: 'Other'
  },
  {
    id: 9,
    key: 'PROFORMA_MONEY_IN',
    label: 'Receivable'
  },
  {
    id: 10,
    key: 'BILL_DOT_COM_BILLS',
    label: 'Bill'
  },
  {
    id: 11,
    key: 'BILL_DOT_COM_BILL_PAYMENTS',
    label: 'Offline Bill'
  },
  {
    id: 12,
    key: 'BILL_DOT_COM_INVOICE',
    label: 'Invoice'
  },
  {
    id: 13,
    key: 'BILL_DOT_COM_RECEIVED_PAYMENTS',
    label: 'Invoice'
  },
];
