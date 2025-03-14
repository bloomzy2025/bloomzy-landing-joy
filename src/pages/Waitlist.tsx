
import { GridBackground } from "@/components/ui/grid-background";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Waitlist() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl mx-auto p-8 space-y-12">
          <Link to="/">
            <Button 
              variant="outline" 
              className="mb-6 flex items-center text-gray-300 hover:text-white bg-gray-900/60 border-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="space-y-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
              Join Our Product Launch Waitlist
            </h2>
            <p className="text-xl text-gray-300 max-w-lg mx-auto">
              Be part of something truly extraordinary. Join thousands of others
              already gaining early access to our revolutionary new product.
            </p>
          </div>

          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-gray-900/50 border-gray-700 text-white"
            />
            <Button
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Notified
            </Button>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-gray-800 w-12 h-12">
                  <AvatarFallback className="text-sm font-semibold bg-purple-600">JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-gray-800 w-12 h-12">
                  <AvatarFallback className="text-sm font-semibold bg-blue-600">AS</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-gray-800 w-12 h-12">
                  <AvatarFallback className="text-sm font-semibold bg-blue-700">MK</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-bold text-gray-200">100+ people on the waitlist</span>
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
