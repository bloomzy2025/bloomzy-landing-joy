"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import AuthButton from "@/components/auth/AuthButton";
import { ChevronDown } from "lucide-react";
function Header1() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="bg-gray-50">
      <div className="container flex justify-between items-center bg-zinc-50">
        {/* Left navigation links */}
        <div className="flex items-center gap-8">
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
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center overflow-hidden">
            <img src="/lovable-uploads/12735e3d-18db-4ce4-bb6a-fba45bf2629d.png" alt="Bloomzy Logo" className="w-full h-full object-cover" />
          </div>
          Bloomzy
        </Link>
        
        {/* Right buttons */}
        <div className="flex items-center gap-4">
          <Link to="/demo" className="text-sm font-medium">
            Book a demo
          </Link>
          <Link to="/signin" className="text-sm font-medium">
            Sign in
          </Link>
          <Link to="/signup" className={cn(buttonVariants({
          variant: "default"
        }), "bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90")}>
            Get started
          </Link>
        </div>
      </div>
    </div>;
}
export { Header1 };