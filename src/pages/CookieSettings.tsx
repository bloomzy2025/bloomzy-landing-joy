
import { useState, useEffect } from "react";
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export default function CookieSettings() {
  const navigate = useNavigate();
  
  // Cookie consent state
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true and cannot be changed
    functional: false,
    analytics: false,
    marketing: false
  });

  // Load saved preferences on initial render
  useEffect(() => {
    const savedPreferences = localStorage.getItem('bloomzy-cookie-preferences');
    if (savedPreferences) {
      setCookiePreferences({
        ...JSON.parse(savedPreferences),
        necessary: true // Always ensure necessary cookies are enabled
      });
    }
  }, []);

  const handlePreferenceChange = (type: 'functional' | 'analytics' | 'marketing') => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    // Store preferences in localStorage
    localStorage.setItem(
      'bloomzy-cookie-preferences', 
      JSON.stringify(cookiePreferences)
    );
    
    // Actually set/remove cookies based on preferences here
    // This would involve more complex logic for actual cookie management
    
    toast({
      title: "Preferences Updated",
      description: "Your cookie preferences have been saved.",
      variant: "default",
    });
  };

  const acceptAll = () => {
    const allEnabled = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    setCookiePreferences(allEnabled);
    localStorage.setItem('bloomzy-cookie-preferences', JSON.stringify(allEnabled));
    
    toast({
      title: "All Cookies Accepted",
      description: "You've enabled all cookie categories.",
      variant: "default",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header1 />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-gray-600 hover:text-brand-green"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-green">Cookie Settings</h1>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Info className="h-5 w-5 text-brand-green mt-1 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              This page allows you to customize your cookie preferences for Bloomzy. We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content.
            </p>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button onClick={acceptAll} className="bg-brand-green hover:bg-brand-green/90">
              Accept All
            </Button>
            <Button onClick={savePreferences} variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green/10">
              Save Preferences
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox id="necessary" checked={cookiePreferences.necessary} disabled />
                <div>
                  <Label htmlFor="necessary" className="text-lg font-medium">Necessary Cookies</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Always active</p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="functional" 
                  checked={cookiePreferences.functional}
                  onCheckedChange={() => handlePreferenceChange('functional')}
                />
                <div>
                  <Label htmlFor="functional" className="text-lg font-medium">Functional Cookies</Label>
                </div>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              These cookies allow the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="analytics" 
                  checked={cookiePreferences.analytics}
                  onCheckedChange={() => handlePreferenceChange('analytics')}
                />
                <div>
                  <Label htmlFor="analytics" className="text-lg font-medium">Analytics Cookies</Label>
                </div>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website and services.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="marketing" 
                  checked={cookiePreferences.marketing}
                  onCheckedChange={() => handlePreferenceChange('marketing')}
                />
                <div>
                  <Label htmlFor="marketing" className="text-lg font-medium">Marketing Cookies</Label>
                </div>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              These cookies are used to track visitors across websites. They are set to display targeted advertisements that are relevant and engaging for the individual user.
            </p>
          </div>
        </div>
        
        <Separator className="my-10" />
        
        <h2 className="text-2xl font-semibold mb-6 text-brand-green">Cookie Policy Details</h2>
        
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="what-are-cookies">
            <AccordionTrigger className="text-lg font-medium">What are cookies?</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                These files store information about your preferences, device, and online activity. They help us recognize your device and remember certain information about your visit.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="how-we-use">
            <AccordionTrigger className="text-lg font-medium">How Bloomzy uses cookies</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Bloomzy uses cookies for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Remembering your preferences and settings</li>
                <li>Keeping you signed in to your account</li>
                <li>Understanding how you use our website</li>
                <li>Improving our services based on your behavior</li>
                <li>Providing personalized content and recommendations</li>
                <li>Measuring the effectiveness of our marketing campaigns</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="third-party">
            <AccordionTrigger className="text-lg font-medium">Third-party cookies</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                These third-party services have their own privacy policies and may collect data about your browsing history across different websites and online services. We do not have control over these cookies.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="manage-cookies">
            <AccordionTrigger className="text-lg font-medium">Managing cookies in your browser</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                You can delete existing cookies, allow or block all cookies, and set preferences for certain websites. Please note that deleting or blocking cookies may impact your experience on our website and others.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-brand-green">More Information</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For more detailed information about how we use cookies and your personal data, please refer to our:
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="link" className="text-brand-green p-0 h-auto" onClick={() => navigate('/privacy-policy')}>
              Privacy Policy
            </Button>
            <Button variant="link" className="text-brand-green p-0 h-auto" onClick={() => navigate('/terms')}>
              Terms of Service
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Last Updated: September 1, 2023
          </p>
        </div>
      </main>
      
      <Footerdemo />
    </div>
  );
}
