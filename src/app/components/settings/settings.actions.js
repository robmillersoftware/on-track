/**
 * Gets all CFI account options and default CFI account
 */
export const SETTINGS_FETCH = 'PREFERENCES_FETCH';
export const SETTINGS_FETCH_SUCCESS = 'PREFERENCES_FETCH_SUCCESS';
export const SETTINGS_FETCH_FAILURE = 'PREFERENCES_FETCH_FAILURE';

/**
 * TODO: in addition to this call, make call to OLB to get this info
 * (CFI backend does not contain full preferences info)
 */

/**
 * Will call OLB backend to return full routing number info
 * and setting isPasswordVerified boolean value to true
 * */

export const SettingsActions = SettingsService => {
  'ngInject';

  const fetchSettings = () => (dispatch, getState) => {
    dispatch({ type: SETTINGS_FETCH });
    const { current } = getState().accounts;
    return SettingsService.getAccountSettings(current.id)
      .then(settings =>
        dispatch({
          type: SETTINGS_FETCH_SUCCESS,
          payload: settings
        }))
      .catch(err => !err.canceled ?
        dispatch({ type: SETTINGS_FETCH_FAILURE, payload: err }) :
        null);
  };

  return {
    fetchSettings
  };
};
