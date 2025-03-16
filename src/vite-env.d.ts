
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: any) => void;
        renderButton: (element: HTMLElement, options: any) => void;
        prompt: (notification?: any) => void;
      };
    };
  };
  
  AppleID?: {
    auth: {
      init: (config: any) => void;
      renderButton: (config: any) => void;
      signIn: () => Promise<any>;
    };
  };
}
