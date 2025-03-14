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
  const {
    user
  } = useAuth();
  const [messages, setMessages] = useState([{
    id: 1,
    content: "Hello! How can I help you today?",
    sender: "ai"
  }, {
    id: 2,
    content: "I have a question about the component library.",
    sender: "user"
  }, {
    id: 3,
    content: "Sure! I'd be happy to help. What would you like to know?",
    sender: "ai"
  }]);
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
  return;
}