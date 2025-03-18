
import React from "react";
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header1 />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
          
          <div className="space-y-12">
            {/* Greg */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-brand-green dark:text-accent-green">Greg</h2>
              <h3 className="text-xl mb-4 text-gray-700 dark:text-gray-300">Founder & CEO</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Design and wellness technology expert.
              </p>
            </div>
            
            {/* Separator */}
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            
            {/* Brent */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-brand-green dark:text-accent-green">Brent</h2>
              <h3 className="text-xl mb-4 text-gray-700 dark:text-gray-300">Strategy & IP Advisor</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expertise in IP and business scaling.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footerdemo />
    </div>
  );
}
