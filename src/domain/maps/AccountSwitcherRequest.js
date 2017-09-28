export const accountsResource = '/VcfoAccountSwitcherRequest';

const accountMap = dto =>
  ({
    id: dto.accountId,
    description: dto.accountDescription,
    number: dto.accountNumber,
    availableBalance: dto.availableBalance,
    ledgerBalance: dto.ledgerBalance
  });

export const accountsMap = dto => dto.eligibleVcfoAccounts.map(accountMap);
