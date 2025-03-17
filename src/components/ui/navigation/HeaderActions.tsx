
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderActionsProps {
  isMobile?: boolean;
}

export function HeaderActions({ isMobile = false }: HeaderActionsProps) {
  const { user, signOut } = useAuth();
  
  // Get user initials from email or full name if available
  const getUserInitials = () => {
    if (!user) return '';
    
    // Check if user has full_name in user metadata
    const fullName = user.user_metadata?.full_name;
    if (fullName) {
      return fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    // Fallback to email
    if (user.email) {
      return user.email
        .split('@')[0]
        .substring(0, 2)
        .toUpperCase();
    }
    
    return '';
  };
  
  return (
    <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
      {!isMobile && (
        <>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarFallback>
                    {getUserInitials() || <UserRound size={16} />}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuItem className="text-muted-foreground dark:text-gray-400">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem 
                  onClick={() => signOut()} 
                  className="flex items-center gap-2 text-destructive dark:text-red-400 cursor-pointer dark:hover:bg-gray-700"
                >
                  <LogOut size={16} />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin" className="text-sm font-medium dark:text-gray-200">
              Sign in
            </Link>
          )}
        </>
      )}
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link to={user ? "/demo" : "/signup"} className={cn(buttonVariants({
          variant: "default", 
          size: isMobile ? "sm" : "default"
        }), "bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90")}>
          {user 
            ? (isMobile ? "Demo" : "Book a Demo") 
            : (isMobile ? "Start" : "Get started")
          }
        </Link>
      </motion.div>
    </div>
  );
}
