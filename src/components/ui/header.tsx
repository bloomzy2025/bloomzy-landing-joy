"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeaderNavigation } from "./navigation/HeaderNavigation";
import { Logo } from "./navigation/Logo";
import { HeaderActions } from "./navigation/HeaderActions";
import { useLocation } from "react-router-dom";
function Header1() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const heroSection = document.getElementById('hero');
      const featuresSection = document.getElementById('features');
      const pricingSection = document.getElementById('pricing');
      if (heroSection && featuresSection && pricingSection) {
        const scrollPosition = window.scrollY + 100;
        if (scrollPosition >= pricingSection.offsetTop) {
          setActiveSection('pricing');
        } else if (scrollPosition >= featuresSection.offsetTop) {
          setActiveSection('features');
        } else if (scrollPosition >= heroSection.offsetTop) {
          setActiveSection('hero');
        } else {
          setActiveSection(null);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset menu state on location change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      section.classList.add('animate-pulse-subtle');
      setTimeout(() => {
        section.classList.remove('animate-pulse-subtle');
      }, 1000);
    }
  };
  const isActive = (sectionId: string) => activeSection === sectionId;
  return <div className={cn("bg-white dark:bg-gray-900 sticky top-0 z-50 transition-all duration-300", scrolled ? "shadow-md dark:shadow-gray-800/20" : "")}>
      <div className="container flex items-center justify-center bg-white dark:bg-gray-900 p-2 sm:p-4">
        {isMobile ? <div className="flex w-full justify-between items-center">
            <Logo isMobile={isMobile} />
            <button onClick={toggleMenu} className="z-50 p-2 text-gray-800 dark:text-gray-200">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div> : <div className="flex w-full items-center justify-between max-w-5xl mx-auto">
            <div className="flex-shrink-0">
              <Logo isMobile={isMobile} />
            </div>
            
            <div className="flex items-center justify-center gap-8 flex-grow mx-6">
              <HeaderNavigation isMobile={isMobile} menuOpen={menuOpen} activeSection={activeSection} scrollToSection={scrollToSection} isActive={isActive} />
            </div>
            
            <div className="flex-shrink-0 px-[40px]">
              <HeaderActions isMobile={isMobile} />
            </div>
          </div>}
        
        {isMobile && <HeaderNavigation isMobile={isMobile} menuOpen={menuOpen} activeSection={activeSection} scrollToSection={scrollToSection} isActive={isActive} />}
      </div>
    </div>;
}
export { Header1 };