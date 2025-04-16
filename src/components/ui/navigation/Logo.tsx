
import { Link } from "react-router-dom";

interface LogoProps {
  isMobile?: boolean;
}

export function Logo({ isMobile = false }: LogoProps) {
  return (
    <Link to="/" className={`text-3xl font-bold tracking-tighter flex items-center gap-3 text-gray-900 dark:text-white pr-4`}>
      <div className="w-[3.75rem] h-[3.75rem] rounded-full bg-brand-green flex items-center justify-center overflow-hidden">
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
