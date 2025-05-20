
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function AuthButton() {
  // Safely handle potential auth context issues
  const [authError, setAuthError] = useState(false);
  let auth;
  
  try {
    auth = useAuth();
  } catch (error) {
    console.error("Auth context error:", error);
    setAuthError(true);
    // Return fallback UI when auth context is not available
    return (
      <Button variant="outline" className="gap-2 text-yellow-600 dark:text-yellow-500 dark:border-gray-700 dark:hover:bg-gray-800">
        <AlertTriangle size={16} />
        Auth Unavailable
      </Button>
    );
  }
  
  const { user, signOut, isLoading, connectionError } = auth;

  if (connectionError || authError) {
    return (
      <Button variant="outline" className="gap-2 text-yellow-600 dark:text-yellow-500 dark:border-gray-700 dark:hover:bg-gray-800">
        <AlertTriangle size={16} />
        Connection Limited
      </Button>
    );
  }

  if (isLoading) {
    return <Button variant="ghost" disabled className="dark:text-gray-400 dark:hover:bg-transparent">Loading...</Button>;
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" asChild className="dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button asChild className="dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 dark:text-gray-200 dark:hover:bg-gray-800">
          <User size={16} />
          {user.email?.split('@')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
        <DropdownMenuItem className="text-muted-foreground dark:text-gray-400">
          Signed in as {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        <DropdownMenuItem onClick={() => signOut()} className="gap-2 text-destructive dark:text-red-400 dark:hover:bg-gray-700">
          <LogOut size={16} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
