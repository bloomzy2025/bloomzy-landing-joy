
import * as React from "react";
import { useLocation } from "react-router-dom";
import { NavigationLink } from "./NavigationLink";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderNavigationProps {
  isMobile: boolean;
  menuOpen: boolean;
  activeSection: string | null;
  scrollToSection: (sectionId: string) => void;
  isActive: (sectionId: string) => boolean;
}

export function HeaderNavigation({ 
  isMobile, 
  menuOpen, 
  activeSection, 
  scrollToSection, 
  isActive 
}: HeaderNavigationProps) {
  const location = useLocation();

  return (
    <div className={`${isMobile ? (menuOpen ? 'flex absolute top-16 left-0 right-0 flex-col items-start p-4 gap-4 bg-white dark:bg-gray-800 shadow-md z-50' : 'hidden') : 'flex items-center gap-6'}`}>
      {/* Free Tools Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
            Free Tools <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800">
            <DropdownMenuItem>
              <Link to="/time-wasters-audit" className="w-full">
                Time Wasters Audit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/maker-manager-quiz" className="w-full">
                Maker vs Manager Quiz
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/customer-finder" className="w-full">
                First Paying Customer Finder
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <NavigationLink 
        to="/pricing" 
        isActive={location.pathname === "/pricing"}
        className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
      >
        Pricing
      </NavigationLink>
      
      <NavigationLink 
        to="/about" 
        isActive={location.pathname === "/about"}
        className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
      >
        About
      </NavigationLink>
    </div>
  );
}
