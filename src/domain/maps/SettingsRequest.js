import { accountDisplayMask } from '../util';

export const settingsResource = '/VcfoSettingRequest';

const settingsMap = dto => ({
  id: dto.accountId,
  description: dto.accountDescription,
  number: dto.accountNumber,
  numberMasked: accountDisplayMask(dto.maskedAccountNumber),
  availableBalance: dto.availableBalance,
  ledgerBalance: dto.ledgerBalance,
  enrolled: dto.enrolled
});

export const settingMap = dto => ({
  allAccounts: dto.eligibleAccounts.map(settingsMap),
  sfaAccount: dto.sfaAccountId
});
