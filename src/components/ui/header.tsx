
"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import { ChevronDown, Menu, Wrench, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

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
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    setActiveSection(sectionId);
    
    if (location.pathname !== '/') {
      return;
    }
    
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

  return <div className={cn(
    "bg-gray-50 dark:bg-gray-900 sticky top-0 z-50 transition-all duration-300",
    scrolled ? "shadow-md dark:shadow-gray-800/20" : ""
  )}>
      <div className="container flex justify-between items-center rounded-lg bg-zinc-50 dark:bg-gray-900 p-2 sm:p-4">
        {isMobile && (
          <button 
            onClick={toggleMenu} 
            className="z-50 p-2 text-gray-800 dark:text-gray-200"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}
        
        <div className={`${isMobile ? (menuOpen ? 'flex absolute top-16 left-0 right-0 flex-col items-start p-4 gap-4 bg-white dark:bg-gray-800 shadow-md z-50' : 'hidden') : 'flex items-center gap-6'}`}>
          <Link to="/" className="font-medium relative">
            <span className={cn(
              "transition-colors duration-300 dark:text-gray-200",
              isActive('hero') && "text-brand-green dark:text-accent-green"
            )}>
              Home
            </span>
            {isActive('hero') && (
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-brand-green dark:bg-accent-green rounded-full w-full"
                layoutId="navIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium">
              <span className={cn(
                "transition-colors duration-300 dark:text-gray-200",
                isActive('features') && "text-brand-green dark:text-accent-green"
              )}>
                Product
              </span> <ChevronDown className="h-4 w-4 dark:text-gray-400" />
            </button>
            <div className={`absolute left-0 ${isMobile ? 'top-full w-full' : 'top-full w-48'} mt-1 bg-white dark:bg-gray-800 rounded-md shadow-md border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
              <div className="py-2 px-2">
                {location.pathname === '/' ? (
                  <motion.button 
                    onClick={() => scrollToSection('hero')} 
                    className={cn(
                      "block w-full text-left py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm dropdown-item dark:text-gray-200",
                      isActive('hero') && "bg-accent/50 text-brand-green dark:bg-gray-700/50 dark:text-accent-green"
                    )}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Overview
                  </motion.button>
                ) : (
                  <Link to="/#hero" className="block py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    Overview
                  </Link>
                )}
                
                {location.pathname === '/' ? (
                  <motion.button 
                    onClick={() => scrollToSection('features')} 
                    className={cn(
                      "block w-full text-left py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm dropdown-item dark:text-gray-200",
                      isActive('features') && "bg-accent/50 text-brand-green dark:bg-gray-700/50 dark:text-accent-green"
                    )}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Features
                  </motion.button>
                ) : (
                  <Link to="/#features" className="block py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    Features
                  </Link>
                )}
                
                {location.pathname === '/' ? (
                  <motion.button 
                    onClick={() => scrollToSection('pricing')} 
                    className={cn(
                      "block w-full text-left py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm dropdown-item dark:text-gray-200",
                      isActive('pricing') && "bg-accent/50 text-brand-green dark:bg-gray-700/50 dark:text-accent-green"
                    )}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Pricing
                  </motion.button>
                ) : (
                  <Link to="/#pricing" className="block py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    Pricing
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium dark:text-gray-200">
              Company <ChevronDown className="h-4 w-4 dark:text-gray-400" />
            </button>
            <div className={`absolute left-0 ${isMobile ? 'top-full w-full' : 'top-full w-48'} mt-1 bg-white dark:bg-gray-800 rounded-md shadow-md border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
              <div className="py-2 px-2">
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/about" className="block py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    About Us
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/blog" className="block py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    Blog
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/contact" className="block py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    Contact
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium dark:text-gray-200">
              <span className="transition-colors duration-300">
                Free Tools
              </span> <ChevronDown className="h-4 w-4 dark:text-gray-400" />
            </button>
            <div className={`absolute left-0 ${isMobile ? 'top-full w-full' : 'top-full w-48'} mt-1 bg-white dark:bg-gray-800 rounded-md shadow-md border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
              <div className="py-2 px-2">
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/tools/seo-checker" className="flex items-center gap-2 py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    <Wrench className="h-4 w-4 min-w-4 text-brand-green dark:text-accent-green flex-shrink-0" />
                    <span className="truncate">SEO Checker</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/tools/keyword-generator" className="flex items-center gap-2 py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    <Wrench className="h-4 w-4 min-w-4 text-brand-green dark:text-accent-green flex-shrink-0" />
                    <span className="truncate">Keyword Generator</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/tools/content-analyzer" className="flex items-center gap-2 py-2 px-3 hover:bg-accent dark:hover:bg-gray-700 rounded-md text-sm dropdown-item dark:text-gray-200">
                    <Wrench className="h-4 w-4 min-w-4 text-brand-green dark:text-accent-green flex-shrink-0" />
                    <span className="truncate">Content Analyzer</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <Link to="/" className={`${isMobile ? 'mx-auto' : 'absolute left-[52%] transform -translate-x-1/2'} text-xl font-bold tracking-tighter flex items-center gap-2 text-gray-900 dark:text-white`}>
          <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center overflow-hidden">
            <img src="/lovable-uploads/12735e3d-18db-4ce4-bb6a-fba45bf2629d.png" alt="Bloomzy Logo" className="w-full h-full object-cover" />
          </div>
          Bloomzy
        </Link>
        
        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
          {!isMobile && (
            <>
              <Link to="/demo" className="text-sm font-medium dark:text-gray-200">
                Book a demo
              </Link>
              <Link to="/signin" className="text-sm font-medium dark:text-gray-200">
                Sign in
              </Link>
            </>
          )}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/signup" className={cn(buttonVariants({
              variant: "default", 
              size: isMobile ? "sm" : "default"
            }), "bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90")}>
              {isMobile ? "Start" : "Get started"}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>;
}
export { Header1 };
