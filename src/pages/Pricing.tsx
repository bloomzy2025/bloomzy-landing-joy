
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page with the pricing section hash
    navigate('/#pricing', { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p>Redirecting to pricing section...</p>
      </div>
    </div>
  );
};

export default Pricing;
