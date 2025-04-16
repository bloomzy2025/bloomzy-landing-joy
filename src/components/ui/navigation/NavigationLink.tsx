
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavigationLinkProps {
  to: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavigationLink({
  to,
  isActive = false,
  children,
  onClick,
  className
}: NavigationLinkProps) {
  return (
    <Link 
      to={to} 
      className={cn(
        "font-medium relative text-sm transition-colors", 
        className || "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
      )} 
      onClick={onClick}
    >
      {children}
      
      {isActive && (
        <motion.div 
          className="absolute -bottom-1 left-0 h-0.5 bg-brand-green dark:bg-accent-green rounded-full w-full" 
          layoutId="navIndicator" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}
