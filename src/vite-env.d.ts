/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;

  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
