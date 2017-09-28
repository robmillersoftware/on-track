import template from './verify-password.html';

/**
 * Verify password component. Contains input and
 * submit for verification.
 */
export const verifyPasswordComponent = {
  template,
  bindings: {
    onVerify: '&'
  }
};
