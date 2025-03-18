
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface LogoProps {
  isMobile?: boolean;
}

export function Logo({ isMobile = false }: LogoProps) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  // Preload the logo image
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/12735e3d-18db-4ce4-bb6a-fba45bf2629d.png";
    img.onload = () => setLogoLoaded(true);
    
    // If the image is already cached, it might have loaded before the onload handler was set
    if (img.complete) {
      setLogoLoaded(true);
    }
    
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <Link to="/" className={`${isMobile ? 'mx-auto' : 'absolute left-[52%] transform -translate-x-1/2'} text-xl font-bold tracking-tighter flex items-center gap-2 text-gray-900 dark:text-white`}>
      <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center overflow-hidden">
        {logoLoaded ? (
          <img 
            src="/lovable-uploads/12735e3d-18db-4ce4-bb6a-fba45bf2629d.png" 
            alt="Bloomzy Logo" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
        )}
      </div>
      Bloomzy
    </Link>
  );
}
