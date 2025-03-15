
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface HeaderActionsProps {
  isMobile?: boolean;
}

export function HeaderActions({ isMobile = false }: HeaderActionsProps) {
  return (
    <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
      {!isMobile && (
        <>
          <Link to="/demo" className="text-sm font-medium dark:text-gray-200">
            Book a demo
          </Link>
          <Link to="/signin" className="text-sm font-medium dark:text-gray-200">
            Sign in
          </Link>
        </>
      )}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link to="/signup" className={cn(buttonVariants({
          variant: "default", 
          size: isMobile ? "sm" : "default"
        }), "bg-brand-green hover:bg-brand-green/90 dark:bg-[#82c29e] dark:hover:bg-[#82c29e]/90")}>
          {isMobile ? "Start" : "Get started"}
        </Link>
      </motion.div>
    </div>
  );
}
