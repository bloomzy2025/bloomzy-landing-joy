
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = "received", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-max max-w-[calc(100%-2rem)] items-start gap-2 py-2",
          variant === "sent" ? "ml-auto" : "mr-auto",
          className
        )}
        {...props}
      />
    )
  }
)
ChatBubble.displayName = "ChatBubble"

interface ChatBubbleAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar> {
  fallback?: React.ReactNode
  status?: "online" | "offline" | "away" | "busy"
  imageSrc?: string
}

const ChatBubbleAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  ChatBubbleAvatarProps
>(({ className, imageSrc, fallback, status, ...props }, ref) => {
  return (
    <div className="relative flex-shrink-0">
      <Avatar
        ref={ref}
        className={cn("h-10 w-10 rounded-full", className)}
        {...props}
      >
        {imageSrc && <AvatarImage src={imageSrc} />}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {status && (
        <Badge
          variant={
            status === "online"
              ? "default"
              : status === "offline"
              ? "outline"
              : status === "away"
              ? "secondary"
              : "destructive"
          }
          className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-none p-0"
        />
      )}
    </div>
  )
})
ChatBubbleAvatar.displayName = "ChatBubbleAvatar"

interface ChatBubbleMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
  isLoading?: boolean
}

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  ChatBubbleMessageProps
>(
  (
    { className, variant = "received", isLoading = false, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1 rounded-xl px-4 py-3 text-sm",
          variant === "sent"
            ? "bg-brand-green text-white"
            : "bg-muted",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-current"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-current"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        ) : (
          children
        )}
      </div>
    )
  }
)
ChatBubbleMessage.displayName = "ChatBubbleMessage"

export { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage }
