/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KEYCLOAK_URL: string;
    readonly VITE_KEYCLOAK_REALM: string;
    readonly VITE_KEYCLOAK_CLIENT_ID: string;
    readonly VITE_WHITEBOARD_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  