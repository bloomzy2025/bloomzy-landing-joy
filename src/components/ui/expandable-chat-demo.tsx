
"use client";

import { useState, FormEvent } from "react";
import { Send, Bot, Paperclip, Mic, CornerDownLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { ExpandableChat, ExpandableChatHeader, ExpandableChatBody, ExpandableChatFooter } from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useAuth } from "@/hooks/useAuth";

export function ExpandableChatDemo() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai"
    },
    {
      id: 2,
      content: "I have a question about the component library.",
      sender: "user"
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know?",
      sender: "ai"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      content: input,
      sender: "user"
    }]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        content: "This is an AI response to your message.",
        sender: "ai"
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    //
  };

  const handleMicrophoneClick = () => {
    //
  };

  // Get the user's first initial if they are signed in
  const getUserAvatar = () => {
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return <User className="h-4 w-4" />;
  };

  return (
    <ExpandableChat>
      <ExpandableChatHeader>
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-full">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-medium">Bloomzy AI Assistant</span>
        </div>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              align={message.sender === "user" ? "end" : "start"}
              className="mb-4"
            >
              <ChatBubbleAvatar>
                {message.sender === "user" ? getUserAvatar() : <Bot className="h-4 w-4" />}
              </ChatBubbleAvatar>
              <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isLoading && (
            <ChatBubble align="start" className="mb-4">
              <ChatBubbleAvatar>
                <Bot className="h-4 w-4" />
              </ChatBubbleAvatar>
              <ChatBubbleMessage>
                <div className="flex space-x-1">
                  <div className="animate-bounce h-2 w-2 bg-current rounded-full" />
                  <div className="animate-bounce delay-75 h-2 w-2 bg-current rounded-full" />
                  <div className="animate-bounce delay-150 h-2 w-2 bg-current rounded-full" />
                </div>
              </ChatBubbleMessage>
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleAttachFile}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleMicrophoneClick}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          <kbd className="rounded border px-1 py-0.5 bg-muted">Enter</kbd>{" "}
          to send,{" "}
          <kbd className="rounded border px-1 py-0.5 bg-muted">
            <CornerDownLeft className="h-3 w-3 inline align-text-bottom" />
          </kbd>{" "}
          for new line
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
