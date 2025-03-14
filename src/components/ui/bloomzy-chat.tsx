
"use client"

import { useState, FormEvent, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import {
  ExpandableChat,
  ExpandableChatContent,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from "@/components/ui/expandable-chat"
import { MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: Date
}

export function BloomzyChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm Bloomzy Assistant. How can I help you grow your startup today?",
      role: "assistant",
      createdAt: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      createdAt: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd recommend focusing on validating your core value proposition first. Have you identified your target users?",
        "Based on what you've shared, I think prioritizing your go-to-market strategy would be most impactful right now.",
        "That's a great question! You might want to consider implementing a more systematic approach to user feedback.",
        "Bloomzy's task prioritization features could help you tackle that challenge. Would you like me to show you how?",
        "Many founders struggle with that exact issue. Let me share some strategies that have worked for others.",
      ]
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        createdAt: new Date(),
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      // Show typing indicator for initial message when chat is first opened
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, messages.length])

  const ChatBubbleAvatar = ({ role, imageSrc }: { role: "user" | "assistant", imageSrc?: string }) => {
    if (role === "assistant") {
      return (
        <Avatar>
          <AvatarImage src="/lovable-uploads/d93ebfb7-7e3d-4ab8-8c98-38a4df8c7a55.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )
    }
    
    return (
      <Avatar>
        {user ? (
          <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
        ) : (
          <AvatarFallback>U</AvatarFallback>
        )}
      </Avatar>
    )
  }

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={!isOpen ? <MessageCircle /> : undefined}
      onOpenChange={setIsOpen}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Bloomzy Assistant</h1>
        <p className="text-xs text-muted-foreground">
          Ask anything about startup growth and prioritization
        </p>
      </ExpandableChatHeader>
      <ExpandableChatContent>
        <ChatMessageList isLoading={isLoading}>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              content={message.content}
              position={message.role === "user" ? "right" : "left"}
              avatar={<ChatBubbleAvatar role={message.role} />}
            />
          ))}
        </ChatMessageList>
      </ExpandableChatContent>
      <ExpandableChatFooter>
        <ChatInput
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
        />
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
