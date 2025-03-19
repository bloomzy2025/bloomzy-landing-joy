"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, Calendar, ListTodo, Leaf, Target, Brain, Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const {
    toast
  } = useToast();
  
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our latest updates and news."
    });
  };
  
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });

      element.classList.add('section-highlight');
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 2000);
    }
  };
  
  return <footer className="relative border-t bg-brand-green dark:bg-[#1A1F2C] text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-gray-300 dark:text-gray-300">
              Join our newsletter for the latest updates on startup growth and clarity.
            </p>
            <form className="relative" onSubmit={handleSubscribe}>
              <Input type="email" placeholder="Enter your email" className="pr-12 backdrop-blur-sm border-white/20 text-brand-green dark:text-gray-200 dark:bg-gray-800/50 dark:border-gray-700" />
              <Button type="submit" size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full bg-accent-green text-brand-green dark:text-gray-800 transition-transform hover:scale-105">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-accent-green/10 dark:bg-accent-green/5 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/#" onClick={e => scrollToSection("hero", e)} className="block transition-colors hover:text-accent-green">
                Home
              </a>
              <a href="/#features" onClick={e => scrollToSection("features", e)} className="block transition-colors hover:text-accent-green">
                Features
              </a>
              <a href="/#pricing" onClick={e => scrollToSection("pricing", e)} className="block transition-colors hover:text-accent-green">
                Pricing
              </a>
              <a href="#" className="block transition-colors hover:text-accent-green">
                Blog
              </a>
              
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic dark:text-gray-300">
              <p>245 Fennell Ave W.</p>
              <p>Hamilton, ON L9C 7V7</p>
              <p>Phone: (905) 517 - 4734</p>
              <p>Email: <a href="mailto:info@bloomzy.ca" className="text-accent-green hover:underline">info@bloomzy.ca</a></p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white bg-white/10 hover:text-accent-green hover:border-accent-green dark:border-gray-700 dark:bg-transparent dark:hover:border-accent-green">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white bg-white/10 hover:text-accent-green hover:border-accent-green dark:border-gray-700 dark:bg-transparent dark:hover:border-accent-green">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white bg-white/10 hover:text-accent-green hover:border-accent-green dark:border-gray-700 dark:bg-transparent dark:hover:border-accent-green">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white bg-white/10 hover:text-accent-green hover:border-accent-green dark:border-gray-700 dark:bg-transparent dark:hover:border-accent-green">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-accent-green" />
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} className="dark:bg-accent-green/30" />
              <Moon className="h-4 w-4 text-gray-300 dark:text-accent-green" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 dark:border-gray-700/50 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-300 dark:text-gray-400">
            © 2024 Bloomzy. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link to="/privacy-policy" className="transition-colors hover:text-accent-green">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-accent-green">
              Terms of Service
            </Link>
            <Link to="/cookie-settings" className="transition-colors hover:text-accent-green">
              Cookie Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>;
}
export { Footerdemo };
