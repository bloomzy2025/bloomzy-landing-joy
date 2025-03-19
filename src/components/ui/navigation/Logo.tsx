
import { Link } from "react-router-dom";

interface LogoProps {
  isMobile?: boolean;
}

export function Logo({ isMobile = false }: LogoProps) {
  return (
    <Link to="/" className={`${isMobile ? 'mx-auto' : 'absolute left-[52%] transform -translate-x-1/2'} text-xl font-bold tracking-tighter flex items-center gap-2 text-gray-900 dark:text-white`}>
      <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center overflow-hidden">
        <img 
          src="/lovable-uploads/12735e3d-18db-4ce4-bb6a-fba45bf2629d.png" 
          alt="Bloomzy Logo" 
          className="w-full h-full object-cover"
        />
      </div>
      Bloomzy
    </Link>
  );
}
