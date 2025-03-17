
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback handling session check");
        
        // Check for redirectTo param from the URL
        const redirectTo = searchParams.get('redirectTo') || '/';
        console.log("Redirect destination:", redirectTo);
        
        // Get session and check for errors
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          toast({
            title: "Authentication error",
            description: error.message,
            variant: "destructive",
          });
          navigate('/signin');
          return;
        }
        
        // If we have a session, authentication was successful
        if (data.session) {
          console.log("Auth successful, redirecting to:", redirectTo);
          toast({
            title: "Success",
            description: "You have successfully signed in!",
          });
          
          // Check if we're coming from the quiz
          if (redirectTo && redirectTo.includes('/maker-manager-quiz')) {
            // Clear stored result type as it's no longer needed after sign-in
            sessionStorage.removeItem('quizResultType');
          }
          
          navigate(redirectTo);
        } else {
          // No session found, redirect to sign in
          console.log("No session found, redirecting to sign in");
          navigate('/signin');
        }
      } catch (error: any) {
        console.error("Error in auth callback:", error);
        toast({
          title: "Something went wrong",
          description: "An unexpected error occurred during authentication.",
          variant: "destructive",
        });
        navigate('/signin');
      }
    };

    // Slight delay to ensure Supabase has time to process the auth callback
    const timer = setTimeout(() => {
      handleAuthCallback();
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Finishing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}
