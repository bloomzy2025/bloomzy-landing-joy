
import * as React from "react";
import { useLocation } from "react-router-dom";
import { Brain, Wrench, Clock } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownItem } from "./DropdownItem";

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
      <NavigationLink to="/" isActive={isActive('hero')}>
        Home
      </NavigationLink>
      
      <DropdownMenu title="Product" isActive={isActive('features')} isMobile={isMobile}>
        {location.pathname === '/' ? (
          <DropdownItem 
            to="#hero" 
            onClick={() => scrollToSection('hero')} 
            isActive={isActive('hero')}
          >
            Overview
          </DropdownItem>
        ) : (
          <DropdownItem to="/#hero">
            Overview
          </DropdownItem>
        )}
        
        {location.pathname === '/' ? (
          <DropdownItem 
            to="#features" 
            onClick={() => scrollToSection('features')} 
            isActive={isActive('features')}
          >
            Features
          </DropdownItem>
        ) : (
          <DropdownItem to="/#features">
            Features
          </DropdownItem>
        )}
        
        {location.pathname === '/' ? (
          <DropdownItem 
            to="#pricing" 
            onClick={() => scrollToSection('pricing')} 
            isActive={isActive('pricing')}
          >
            Pricing
          </DropdownItem>
        ) : (
          <DropdownItem to="/#pricing">
            Pricing
          </DropdownItem>
        )}
      </DropdownMenu>
      
      <DropdownMenu title="Company" isMobile={isMobile}>
        <DropdownItem to="/about">
          About Us
        </DropdownItem>
        <DropdownItem to="/blog">
          Blog
        </DropdownItem>
        <DropdownItem to="/contact">
          Contact
        </DropdownItem>
      </DropdownMenu>
      
      <DropdownMenu title="Free Tools" isMobile={isMobile}>
        <DropdownItem 
          to="/maker-manager-quiz" 
          icon={Brain} 
          iconColor="text-blue-500 dark:text-blue-400"
        >
          Maker vs. Manager Quiz
        </DropdownItem>
        <DropdownItem 
          to="/time-wasters-audit" 
          icon={Clock}
          iconColor="text-green-500 dark:text-green-400"
        >
          Time Wasters Audit
        </DropdownItem>
        <DropdownItem to="/tools/seo-checker" icon={Wrench}>
          SEO Checker
        </DropdownItem>
        <DropdownItem to="/tools/keyword-generator" icon={Wrench}>
          Keyword Generator
        </DropdownItem>
        <DropdownItem to="/tools/content-analyzer" icon={Wrench}>
          Content Analyzer
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
}
