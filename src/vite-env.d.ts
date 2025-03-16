
/// <reference types="vite/client" />

interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (options: any) => void;
        renderButton: (element: HTMLElement, options: any) => void;
        prompt: () => void;
      }
    }
  }
  AppleID?: {
    auth: {
      init: (options: any) => void;
      renderButton: (options: any) => void;
      signIn: () => Promise<any>;
    }
  }
}
