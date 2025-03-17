
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Burnout", "72 Hour Work Weeks", "Time-wasting tasks", "Lack of direction", "Startup Chaos"], []);
  const { user } = useAuth();
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
        <div className="flex gap-8 py-20 items-center justify-center flex-col lg:py-[60px]">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Scale your startup from 0 without</span>
              <span className={`relative flex w-full justify-center overflow-visible ${isMobile ? 'h-20' : 'overflow-hidden'} text-center md:pb-4 md:pt-1`}>
                &nbsp;
                {titles.map((title, index) => <motion.span 
                  key={index} 
                  className="absolute font-semibold" 
                  initial={{
                    opacity: 0,
                    y: 15 // Keeping reduced value for less dramatic movement
                  }} 
                  transition={{
                    type: "spring",
                    stiffness: 100, // Keeping increased stiffness for cleaner motion
                    damping: 12, // Keeping damping for smoother animation
                    duration: 0.3 // Keeping explicit duration for consistent transition
                  }} 
                  animate={titleNumber === index ? {
                    y: 0,
                    opacity: 1
                  } : {
                    y: titleNumber > index ? -15 : 15, // Keeping reduced value
                    opacity: 0,
                    transition: {
                      duration: 0.2 // Keeping faster exit animation
                    }
                  }}
                >
                  {title}
                </motion.span>)}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline" asChild>
              <Link to="/contact">Jump on a call <PhoneCall className="w-4 h-4" /></Link>
            </Button>
            {user ? (
              <Button size="lg" className="gap-4">
                Dashboard <MoveRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button size="lg" className="gap-4" asChild>
                <Link to="/signup">Sign up here <MoveRight className="w-4 h-4" /></Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>;
}

export { Hero };
