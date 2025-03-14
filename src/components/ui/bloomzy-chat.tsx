
"use client"

import { useState, FormEvent } from "react"
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"

export function BloomzyChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you with Bloomzy today?",
      sender: "ai",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: getAIResponse(input),
          sender: "ai",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("pricing") || lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("plan")) {
      return "Our pricing plans start with a free tier, and paid plans range from $19 to $63 per month (billed annually). The Growth plan at $63/month is our most popular option. Would you like more specific details about a particular plan?";
    } else if (lowerCaseMessage.includes("feature") || lowerCaseMessage.includes("what can you do")) {
      return "Bloomzy helps startup founders prioritize their work with AI guidance, ROI breakdowns, and our Habitree visualization system. We also plant real trees when you complete goals! What specific feature would you like to know more about?";
    } else if (lowerCaseMessage.includes("tree") || lowerCaseMessage.includes("plant")) {
      return "Yes! For every plan, we plant real trees when you complete your goals. The free plan includes 1 tree planted monthly, Startup plan includes 5 trees, Growth plan includes 15 trees, and Enterprise includes 50 trees monthly!";
    } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("support") || lowerCaseMessage.includes("help")) {
      return "You can reach our support team at info@bloomzy.ca or call us at (905) 517-4734. We're located at 245 Fennell Ave W., Hamilton, ON L9C 7V7.";
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey")) {
      return "Hello there! How can I help you with Bloomzy today?";
    } else {
      return "Thanks for your message. Bloomzy helps startup founders prioritize their work effectively with AI guidance. Is there something specific about our platform you'd like to know?";
    }
  }

  const handleAttachFile = () => {
    // Placeholder for file attachment functionality
  }

  const handleMicrophoneClick = () => {
    // Placeholder for voice input functionality
  }

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Bloomzy Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about our productivity platform
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.sender === "user"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                }
                fallback={message.sender === "user" ? "YOU" : "AI"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
