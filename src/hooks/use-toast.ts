
import { useState, useCallback, useEffect } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

interface ToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

const TOAST_TIMEOUT = 5000;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts(toasts => toasts.slice(1));
    }, TOAST_TIMEOUT);
    
    return () => clearInterval(interval);
  }, [toasts]);

  const toast = useCallback(({ title, description, action, variant = "default" }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(toasts => [...toasts, { id, title, description, action, variant }]);
    
    return {
      id,
      dismiss: () => setToasts(toasts => toasts.filter(t => t.id !== id)),
    };
  }, []);

  return {
    toast,
    toasts,
    dismiss: (toastId: string) => setToasts(toasts => toasts.filter(t => t.id !== toastId)),
  };
};

// For direct usage without hooks
export const toast = (options: ToastOptions) => {
  const event = new CustomEvent("toast", { detail: options });
  document.dispatchEvent(event);
};
