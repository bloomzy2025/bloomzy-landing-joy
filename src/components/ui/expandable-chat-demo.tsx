
"use client";

import { useState, FormEvent } from "react";
import { Send, Bot, Paperclip, Mic, CornerDownLeft, User, MessageCircle, Leaf } from "lucide-react";
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
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: input,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: "Thanks for your message. How can I assist you with Bloomzy's component library?",
        sender: "ai"
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    // File attachment functionality would go here
    console.log("File attachment clicked");
  };

  const handleMicrophoneClick = () => {
    // Voice input functionality would go here
    console.log("Microphone clicked");
  };

  // Get the user's first initial if they are signed in
  const getUserAvatar = () => {
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return <User className="h-4 w-4" />;
  };

  return (
    <ExpandableChat
      icon={<Leaf className="h-6 w-6 text-white" />}
      position="bottom-right"
      size="md"
    >
      <ExpandableChatHeader>
        <div className="flex items-center gap-2">
          <div className="bg-brand-green p-1.5 rounded-full">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium">Bloomzy Assistant</span>
        </div>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              className={`mb-4 ${message.sender === "user" ? "ml-auto" : "mr-auto"}`}
            >
              <ChatBubbleAvatar>
                {message.sender === "user" 
                  ? getUserAvatar() 
                  : <div className="bg-brand-green text-white p-1 rounded-full flex items-center justify-center">
                      <Leaf className="h-4 w-4" />
                    </div>
                }
              </ChatBubbleAvatar>
              <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isLoading && (
            <ChatBubble className="mb-4 mr-auto">
              <ChatBubbleAvatar>
                <div className="bg-brand-green text-white p-1 rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4" />
                </div>
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
            className="flex-1 min-h-10 max-h-32"
          />
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleAttachFile}
              className="transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleMicrophoneClick}
              className="transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="bg-brand-green hover:bg-brand-green/90 transition-all"
            >
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
