export const APP_SET_INITIAL_ACCOUNT_ID = 'APP_SET_INITIAL_ACCOUNT_ID';

/**
 * Sets default account id when CFI is loaded
 */
export const setInitialAccountId = accountId => ({
  type: APP_SET_INITIAL_ACCOUNT_ID,
  payload: accountId
});
