
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = ["Burnout", "72 Hour Work Weeks", "Time-wasting tasks", "Lack of direction", "Startup Chaos"];
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);
  
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-6 items-center justify-center flex-col lg:py-[40px] py-[10px]">
          <div className="flex gap-3 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Scale your startup from 0 without</span>
              <div className={`relative flex justify-center ${isMobile ? 'h-20' : 'h-24'} overflow-hidden mt-2`}>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={titleNumber}
                    className="absolute font-semibold text-center"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Startup life can be chaotic - Bloomzy makes it easier with simple daily steps that build real results - without the stress.
            </p>
          </div>
          <div className="flex flex-row">
            <Button size="lg" className="gap-4" asChild>
              <Link to="/calendly">Get early access <MoveRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
