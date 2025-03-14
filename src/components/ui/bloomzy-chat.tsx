
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface BloomzyChatProps {
  className?: string;
}

export const BloomzyChat: React.FC<BloomzyChatProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={chatWindowRef} className={cn("fixed bottom-4 right-4 z-50", className)}>
      {expanded && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 p-4">
            <h5 className="text-sm font-medium">We're here to help!</h5>
            <p className="text-xs text-gray-500">Our team is online and ready to assist.</p>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-700">You can ask us anything about Bloomzy.</p>
          </div>
          <div className="p-4">
            <input type="text" placeholder="Type your message..." className="w-full p-2 border rounded-md text-xs" />
            <button className="w-full mt-2 p-2 bg-brand-green text-white rounded-md text-xs">Send</button>
          </div>
        </div>
      )}
      <div onClick={() => setExpanded(!expanded)} className="relative w-16 h-16 rounded-full bg-brand-green text-white flex items-center justify-center cursor-pointer">
        <Avatar className="w-12 h-12">
          <AvatarFallback>BZ</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
