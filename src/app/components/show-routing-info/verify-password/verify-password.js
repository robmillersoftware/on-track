import angular from 'angular';
import { verifyPasswordComponent } from './verify-password.component';

export const verifyPassword = angular
  .module('cfi.components.verifyPassword', [])
  .component('verifyPassword', verifyPasswordComponent);
