import React from 'react';

const AppleButton = () => null;

const appleAuth = {
  isSupported: false,
  Operation: {
    LOGIN: 1,
    REFRESH: 2,
    LOGOUT: 3,
  },
  State: {
    REVOKED: 0,
    AUTHORIZED: 1,
    NOT_FOUND: 2,
  },
  Scope: {
    EMAIL: 0,
    FULL_NAME: 1,
  },
  CredentialState: {
    REVOKED: 0,
    AUTHORIZED: 1,
    NOT_FOUND: 2,
  },
  performRequest: async () => {},
  getCredentialStateForUser: async () => {},
  onCredentialRevoked: () => {},
};

export { AppleButton, appleAuth };
export default appleAuth;
