/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUR_VARIABLE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
