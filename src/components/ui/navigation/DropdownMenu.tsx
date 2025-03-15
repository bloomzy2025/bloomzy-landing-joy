
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  title: string;
  isActive?: boolean;
  isMobile?: boolean;
  children: React.ReactNode;
}

export function DropdownMenu({ title, isActive = false, isMobile = false, children }: DropdownMenuProps) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 font-medium">
        <span className={cn(
          "transition-colors duration-300 dark:text-gray-200",
          isActive && "text-brand-green dark:text-accent-green"
        )}>
          {title}
        </span> <ChevronDown className="h-4 w-4 dark:text-gray-400" />
      </button>
      <div className={`absolute left-0 ${isMobile ? 'top-full w-full' : 'top-full w-48'} mt-1 bg-white dark:bg-gray-800 rounded-md shadow-md border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
        <div className="py-2 px-2">
          {children}
        </div>
      </div>
    </div>
  );
}
