
"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import { ChevronDown, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function Header1() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return <div className="bg-gray-50">
      <div className="container flex justify-between items-center rounded-lg bg-zinc-50 p-2 sm:p-4">
        {/* Mobile menu toggle */}
        {isMobile && (
          <button 
            onClick={toggleMenu} 
            className="z-50 p-2"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}
        
        {/* Left navigation links - hidden on mobile unless menu is open */}
        <div className={`${isMobile ? (menuOpen ? 'flex absolute top-16 left-0 right-0 flex-col items-start p-4 gap-4 bg-white shadow-md z-50' : 'hidden') : 'flex items-center gap-8'}`}>
          <Link to="/" className="font-medium">
            Home
          </Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium">
              Product <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-background rounded-md shadow-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <Link to="/product" className="block p-2 hover:bg-accent rounded-md">
                  Overview
                </Link>
                <Link to="/features" className="block p-2 hover:bg-accent rounded-md">
                  Features
                </Link>
                <Link to="/pricing" className="block p-2 hover:bg-accent rounded-md">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium">
              Company <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-background rounded-md shadow-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <Link to="/about" className="block p-2 hover:bg-accent rounded-md">
                  About Us
                </Link>
                <Link to="/blog" className="block p-2 hover:bg-accent rounded-md">
                  Blog
                </Link>
                <Link to="/careers" className="block p-2 hover:bg-accent rounded-md">
                  Careers
                </Link>
                <Link to="/contact" className="block p-2 hover:bg-accent rounded-md">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center logo */}
        <Link to="/" className={`${isMobile ? 'ml-8' : 'absolute left-1/2 transform -translate-x-1/2'} text-xl font-bold tracking-tighter flex items-center gap-2`}>
          <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center overflow-hidden">
            <img src="/lovable-uploads/12735e3d-18db-4ce4-bb6a-fba45bf2629d.png" alt="Bloomzy Logo" className="w-full h-full object-cover" />
          </div>
          Bloomzy
        </Link>
        
        {/* Right buttons - condensed on mobile */}
        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
          {!isMobile && (
            <>
              <Link to="/demo" className="text-sm font-medium">
                Book a demo
              </Link>
              <Link to="/signin" className="text-sm font-medium">
                Sign in
              </Link>
            </>
          )}
          <Link to="/signup" className={cn(buttonVariants({
            variant: "default", 
            size: isMobile ? "sm" : "default"
          }), "bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90")}>
            {isMobile ? "Start" : "Get started"}
          </Link>
        </div>
      </div>
    </div>;
}
export { Header1 };
