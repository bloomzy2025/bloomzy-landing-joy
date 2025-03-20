
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavigationLinkProps {
  to: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavigationLink({
  to,
  isActive = false,
  children,
  onClick
}: NavigationLinkProps) {
  return (
    <Link 
      to={to} 
      className="font-medium relative text-gray-700 dark:text-gray-200 hover:text-brand-green dark:hover:text-accent-green transition-colors" 
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
