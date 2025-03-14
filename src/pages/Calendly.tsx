
import { useEffect, useState } from "react";
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Calendly = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    // Get user data from session storage
    const storedData = sessionStorage.getItem('demoFormData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header1 />
      
      {/* Main Content */}
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Button 
            onClick={() => navigate(-1)}
            variant="ghost" 
            className="mb-8 flex items-center"
          >
            <ArrowLeft className="mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-green">Schedule Your Demo</h1>
            <p className="text-xl mt-6 text-gray-700 dark:text-gray-300">
              Choose a time that works best for you to discuss your needs with our team
            </p>
          </div>
          
          <div className="calendly-inline-widget" 
            data-url="https://calendly.com/bloomzy-info/bloomzy-discovery-call-1?hide_event_type_details=1&hide_gdpr_banner=1" 
            style={{ minWidth: '320px', height: '700px' }}>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {userData ? `Thank you, ${userData.firstName}! We're looking forward to speaking with you.` : 'Thank you for your interest in Bloomzy!'}
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footerdemo />
    </div>
  );
};

export default Calendly;
