
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import { Header1 } from "@/components/ui/header";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get the returnTo parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(returnTo);
    }
  }, [user, navigate, returnTo]);

  return (
    <div className="min-h-screen">
      <Header1 />
      <div className="container max-w-6xl mx-auto py-20 px-4 pt-32">
        <SignInForm returnTo={returnTo} />
      </div>
    </div>
  );
}
