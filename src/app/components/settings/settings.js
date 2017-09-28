import angular from 'angular';
import { settingsComponent } from './settings.component';
import { SettingsActions } from './settings.actions';

export const settings = angular.module('cfi.components.settings', [])
  .component('settings', settingsComponent)
  .service('SettingsActions', SettingsActions);
