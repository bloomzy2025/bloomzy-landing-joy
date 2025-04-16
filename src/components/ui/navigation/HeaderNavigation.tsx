
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
}

export function HeaderNavigation({ 
  isMobile, 
  menuOpen
}: HeaderNavigationProps) {
  const location = useLocation();

  return (
    <div className={`${isMobile ? (menuOpen ? 'flex absolute top-16 left-0 right-0 flex-col items-start p-4 gap-4 bg-white dark:bg-gray-800 shadow-md z-50' : 'hidden') : 'flex items-center gap-6'}`}>
      {/* Dropdown menus with bold styling */}
      <div className="relative group">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-black">
            Programs <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/programs/marketing" className="w-full font-bold">Marketing Programs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/programs/sales" className="w-full font-bold">Sales Programs</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative group">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-black">
            Books <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/books/marketing" className="w-full font-bold">Marketing Books</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/books/sales" className="w-full font-bold">Sales Books</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative group">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-black">
            Free Resources <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/resources/blog" className="w-full font-bold">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/resources/webinars" className="w-full font-bold">Webinars</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <NavigationLink 
        to="/about" 
        className="text-sm font-bold text-gray-800 hover:text-black"
      >
        About
      </NavigationLink>
      
      <NavigationLink 
        to="/contact" 
        className="text-sm font-bold text-gray-800 hover:text-black"
      >
        Contact
      </NavigationLink>
    </div>
  );
}
