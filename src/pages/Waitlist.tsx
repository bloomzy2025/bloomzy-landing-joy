
import { GridBackground } from "@/components/ui/grid-background";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { MoveRight } from "lucide-react";
import { Header1 } from "@/components/ui/header";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Waitlist() {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      
      {/* Fixed header with white background for maximum visibility */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto">
          <Header1 />
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12 pt-24 sm:pt-100">
          {/* Removed "Back to Home" button */}

          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-center tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
              Join Our Product Launch Waitlist
            </h2>
            <p className="text-base sm:text-xl text-gray-300 max-w-xl mx-auto text-center">
              Be part of something truly extraordinary. Join thousands of others
              already gaining early access to our revolutionary new product.
            </p>
          </div>

          {/* Email input - full width on mobile, side by side on desktop */}
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row gap-2'} max-w-md mx-auto`}>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-gray-900/50 border-gray-700 text-white"
            />
            <Button
              size={isMobile ? "default" : "lg"}
              className="flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90 text-white"
            >
              Get Notified
              <MoveRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-6 sm:gap-8 mt-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-gray-800 w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarFallback className="text-xs sm:text-sm font-semibold bg-purple-600">JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-gray-800 w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarFallback className="text-xs sm:text-sm font-semibold bg-blue-600">AS</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-gray-800 w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarFallback className="text-xs sm:text-sm font-semibold bg-blue-700">MK</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-medium text-sm sm:text-base text-gray-200">100+ people on the waitlist</span>
            </div>

            <div className="flex gap-6 justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-100"
              >
                <Icons.twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-100"
              >
                <Icons.gitHub className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
