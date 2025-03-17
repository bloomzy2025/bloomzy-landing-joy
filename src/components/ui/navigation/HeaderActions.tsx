import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import AuthButton from "@/components/auth/AuthButton";

interface HeaderActionsProps {
  isMobile?: boolean;
}

export function HeaderActions({ isMobile = false }: HeaderActionsProps) {
  const { user } = useAuth();
  
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
          <Link to="/demo" className="text-sm font-medium dark:text-gray-200">
            Book a demo
          </Link>
          
          {!user && (
            <Link to="/signin" className="text-sm font-medium dark:text-gray-200">
              Sign in
            </Link>
          )}
          
          {user && (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                <AvatarFallback>
                  {getUserInitials() || <UserRound size={16} />}
                </AvatarFallback>
              </Avatar>
              <AuthButton />
            </div>
          )}
        </>
      )}
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link to="/demo" className={cn(buttonVariants({
          variant: "default", 
          size: isMobile ? "sm" : "default"
        }), "bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90")}>
          {isMobile ? "Demo" : "Book a Demo"}
        </Link>
      </motion.div>
    </div>
  );
}
