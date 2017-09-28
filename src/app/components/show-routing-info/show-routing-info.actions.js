/**
 * Gets full account data for selected account
 */
export const SHOW_ROUTING_INFO = 'SHOW_ROUTING_INFO';

/**
 * TODO: make call to OLB to get this info
 * (CFI backend does not contain this info)
 * The object below is a stand-in for testing purposes.
 * Remove when the call to OLB is added.
 */
const fakeAccountData = {
  accountNumber: '0004104455147',
  domesticRouting: 747851247,
  routingNumber: 301301478,
  swiftCode: 'PNCCUS03'
};

/**
 * Will call OLB backend to return full routing number info
 * and setting isPasswordVerified boolean value to true
 * */
export const getRoutingInfo = () => ({
  type: SHOW_ROUTING_INFO,
  payload: {
    routingInfo: fakeAccountData,
    isPasswordVerified: true
  }
});
