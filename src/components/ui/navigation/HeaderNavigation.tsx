
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
    <div className={`${isMobile ? (menuOpen ? 'flex absolute top-16 left-0 right-0 flex-col items-start p-4 gap-4 bg-white dark:bg-gray-800 shadow-md z-50' : 'hidden') : 'flex items-center gap-10 mx-auto'}`}>
      {/* Programs Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-base font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
            Programs <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800">
            <DropdownMenuItem>
              <Link to="/program-1" className="w-full">
                Program 1
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/program-2" className="w-full">
                Program 2
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/program-3" className="w-full">
                Program 3
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Books Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-base font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
            Books <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800">
            <DropdownMenuItem>
              <Link to="/book-1" className="w-full">
                Book 1
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/book-2" className="w-full">
                Book 2
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Free Resources Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-base font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
            Free Resources <ChevronDown className="h-4 w-4" />
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
      
      {/* About Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-base font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
            About <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800">
            <DropdownMenuItem>
              <Link to="/about" className="w-full">
                About Us
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/team" className="w-full">
                Our Team
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Contact Link */}
      <NavigationLink 
        to="/contact" 
        isActive={location.pathname === "/contact"}
        className="text-base font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
      >
        Contact
      </NavigationLink>
    </div>
  );
}
