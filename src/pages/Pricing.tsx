
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page with the pricing section hash
    const redirectTimer = setTimeout(() => {
      navigate('/#pricing', { replace: true });
    }, 1000); // Add a small delay for the animation
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="text-center p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-16 h-16 mx-auto mb-4 border-4 border-brand-green border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-lg font-medium text-brand-green">Redirecting you to our pricing information...</p>
      </motion.div>
    </div>
  );
};

export default Pricing;
