
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface HeaderActionsProps {
  isMobile?: boolean;
}

export function HeaderActions({
  isMobile = false
}: HeaderActionsProps) {
  return (
    <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4 ml-6'}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link 
          to="/contact"
          className={cn(
            buttonVariants({ variant: "default", size: isMobile ? "sm" : "lg" }), 
            "text-xl font-bold bg-brand-green hover:bg-brand-green/90 text-white px-8 py-3"
          )}
        >
          Let's Talk
        </Link>
      </motion.div>
    </div>
  );
}
