
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Burnout", "72 Hour Work Weeks", "Time-wasting tasks", "Lack of direction", "Startup Chaos"], []);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000); // Set back to 2000ms as requested
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  
  return <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-6 items-center justify-center flex-col lg:py-[40px] py-[10px]">
          <div>
            
          </div>
          <div className="flex gap-3 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Scale your startup from 0 without</span>
              <span className={`relative flex w-full justify-center overflow-visible ${isMobile ? 'h-20' : 'overflow-hidden'} text-center md:pb-3 md:pt-1`}>
                &nbsp;
                {titles.map((title, index) => <motion.span key={index} className="absolute font-semibold" initial={{
                opacity: 0,
                y: 30
              }} transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.3
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1
              } : {
                y: 30,
                opacity: 0,
                transition: {
                  duration: 0.2
                }
              }}>
                  {title}
                </motion.span>)}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">Startup life can be chaotic - Bloomzy makes it easier with simple daily steps that build real results - without the stress.</p>
          </div>
          <div className="flex flex-row">
            <Button size="lg" className="gap-4" asChild>
              <Link to="/calendly">Get early access <MoveRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>;
}

export { Hero };
