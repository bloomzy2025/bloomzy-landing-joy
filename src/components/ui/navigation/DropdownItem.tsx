
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DropdownItemProps {
  to: string;
  icon?: LucideIcon;
  iconColor?: string;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function DropdownItem({ 
  to, 
  icon: Icon, 
  iconColor = "text-brand-green dark:text-accent-green", 
  isActive = false, 
  onClick,
  children 
}: DropdownItemProps) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {onClick ? (
        <button 
          onClick={onClick} 
          className={cn(
            "flex w-full text-left items-center gap-2 py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200",
            isActive && "bg-accent/50 text-brand-green dark:bg-gray-700/50 dark:text-accent-green"
          )}
        >
          {Icon && <Icon className={`h-4 w-4 min-w-4 ${iconColor} flex-shrink-0`} />}
          <span className="inline-block whitespace-normal">{children}</span>
        </button>
      ) : (
        <Link 
          to={to} 
          className={cn(
            "flex items-center gap-2 py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200",
            isActive && "bg-accent/50 text-brand-green dark:bg-gray-700/50 dark:text-accent-green"
          )}
        >
          {Icon && <Icon className={`h-4 w-4 min-w-4 ${iconColor} flex-shrink-0`} />}
          <span className="inline-block whitespace-normal">{children}</span>
        </Link>
      )}
    </motion.div>
  );
}
