
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Burnout", "72 Hour Work Weeks", "Time-wasting tasks", "Lack of direction"], []);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  
  return <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 items-center justify-center flex-col lg:py-[60px]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <motion.span 
                className="text-spektr-cyan-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Scale your startup from 0 without
              </motion.span>
              <span className={`relative flex w-full justify-center overflow-visible ${isMobile ? 'h-20' : 'overflow-hidden'} text-center md:pb-4 md:pt-1`}>
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span 
                    key={index} 
                    className="absolute font-semibold"
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95
                    }} 
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 12
                    }} 
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      color: "#8B5CF6" // Vivid purple color
                    } : {
                      y: titleNumber > index ? -20 : 20,
                      opacity: 0,
                      scale: 0.9,
                      color: "#6E59A5" // Tertiary purple
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p 
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.6,
              type: "spring",
              stiffness: 50
            }}
          >
            <Button size="lg" className="gap-4" variant="outline" asChild>
              <Link to="/calendly">Jump on a call <PhoneCall className="w-4 h-4" /></Link>
            </Button>
            {user ? (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button size="lg" className="gap-4">
                  Dashboard <MoveRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button size="lg" className="gap-4" asChild>
                  <Link to="/signup">Sign up here <MoveRight className="w-4 h-4" /></Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>;
}

export { Hero };
