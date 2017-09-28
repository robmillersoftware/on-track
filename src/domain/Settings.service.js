import { settingsResource, settingMap } from './maps/SettingsRequest';

export default class Settings {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  getAccountSettings(accountId) {
    const options = {
      retry: 2,
      params: {
        vcfoAccountId: accountId
      }
    };
    return this._http.get(settingsResource, options)
      .then(({ data }) => settingMap(data));
  }
}
