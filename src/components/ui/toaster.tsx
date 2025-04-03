
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useCallback } from "react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  // Add useCallback to fix the hook order issue
  const handleDismiss = useCallback((id: string) => {
    dismiss(id)
  }, [dismiss])

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose onClick={() => handleDismiss(id)} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
