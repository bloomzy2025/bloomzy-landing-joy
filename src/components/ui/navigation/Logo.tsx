
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  isMobile?: boolean;
}

export function Logo({ isMobile = false }: LogoProps) {
  return (
    <Link 
      to="/" 
      className="flex items-center font-bold text-xl"
    >
      <img 
        src="/lovable-uploads/a169e02c-1ca5-40a2-b85f-4aad022c2ea8.png" 
        alt="Bloomzy Logo" 
        className={`${isMobile ? 'h-8' : 'h-12'} mr-2`}
      />
    </Link>
  );
}
