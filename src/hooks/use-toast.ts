
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

  // Use a single useCallback for the dismiss function to maintain hook order
  const dismiss = useCallback((toastId: string) => {
    setToasts(toasts => toasts.filter(t => t.id !== toastId));
  }, []);
  
  const toast = useCallback(({ title, description, action, variant = "default" }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(toasts => [...toasts, { id, title, description, action, variant }]);
    
    return {
      id,
      dismiss: () => dismiss(id),
    };
  }, [dismiss]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(toasts => {
          if (toasts.length > 0) {
            return toasts.slice(1);
          }
          return toasts;
        });
      }, TOAST_TIMEOUT);
      
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return {
    toast,
    toasts,
    dismiss,
  };
};

// For direct usage without hooks
export const toast = (options: ToastOptions) => {
  const event = new CustomEvent("toast", { detail: options });
  document.dispatchEvent(event);
};
