"use client"
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/',
  realm: 'master',
  clientId: 'react-client'
};

let keycloak: Keycloak | null = null;

export const initializeKeycloak = (): Promise<Keycloak> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      if (!keycloak) {
        keycloak = new Keycloak(keycloakConfig);
      }
      keycloak.init({ onLoad: 'login-required' })
        .then(() => resolve(keycloak))
        .catch(error => {
          console.error('Keycloak initialization failed:', error);
          reject(error);
        });
    } else {
      reject(new Error('Keycloak initialization requires a browser environment.'));
    }
  });
};

export default keycloak;