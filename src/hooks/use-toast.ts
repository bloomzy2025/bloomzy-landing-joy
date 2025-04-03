
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
    console.log("Dismissing toast:", toastId);
    setToasts(toasts => toasts.filter(t => t.id !== toastId));
  }, []);
  
  const toast = useCallback(({ title, description, action, variant = "default" }: ToastOptions) => {
    console.log("Creating toast:", { title, variant });
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
            const updated = toasts.slice(1);
            console.log("Auto-dismissing oldest toast, remaining:", updated.length);
            return updated;
          }
          return toasts;
        });
      }, TOAST_TIMEOUT);
      
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Listen for custom toast events
  useEffect(() => {
    const handleCustomToast = (event: CustomEvent<ToastOptions>) => {
      console.log("Received custom toast event:", event.detail);
      toast(event.detail);
    };

    document.addEventListener("toast" as any, handleCustomToast as any);
    
    return () => {
      document.removeEventListener("toast" as any, handleCustomToast as any);
    };
  }, [toast]);

  return {
    toast,
    toasts,
    dismiss,
  };
};

// For direct usage without hooks
export const toast = (options: ToastOptions) => {
  console.log("Using global toast function:", options);
  const event = new CustomEvent("toast", { detail: options });
  document.dispatchEvent(event);
};
