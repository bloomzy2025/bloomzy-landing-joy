
import * as React from "react";
import { useLocation } from "react-router-dom";
import { NavigationLink } from "./NavigationLink";
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
      <NavigationLink to="/pricing" isActive={location.pathname === "/pricing"}>
        Pricing
      </NavigationLink>
      
      <NavigationLink to="/about" isActive={location.pathname === "/about"}>
        About
      </NavigationLink>
    </div>
  );
}
