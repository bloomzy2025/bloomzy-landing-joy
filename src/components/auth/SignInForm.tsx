import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

type SignInFormProps = {
  returnTo?: string;
};

export default function SignInForm({ returnTo = '/' }: SignInFormProps) {
  const { signIn, signInWithProvider, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [isFromQuiz, setIsFromQuiz] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const appleButtonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if we're coming from the maker-manager quiz
    if (returnTo.includes('/maker-manager-quiz') || location.search.includes('returnTo=/maker-manager-quiz')) {
      setIsFromQuiz(true);
    }
  }, [returnTo, location.search]);
  
  useEffect(() => {
    // Initialize Google One Tap button
    if (googleButtonRef.current) {
      const container = googleButtonRef.current;
      container.innerHTML = '';
      
      // Create the Google Sign-In button
      const googleSignInButton = document.createElement('div');
      googleSignInButton.className = 'g_id_signin';
      googleSignInButton.dataset.type = 'standard';
      googleSignInButton.dataset.size = 'large';
      googleSignInButton.dataset.theme = 'outline';
      googleSignInButton.dataset.text = 'sign_in_with';
      googleSignInButton.dataset.shape = 'rectangular';
      googleSignInButton.dataset.logo_alignment = 'left';
      googleSignInButton.dataset.width = '100%';
      
      container.appendChild(googleSignInButton);
      
      // Initialize the One Tap functionality with explicit permission scopes
      window.google?.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // This should be replaced with actual client ID
        callback: async (response) => {
          if (response.credential) {
            // Use the id_token from Google response
            await signInWithProvider('google', returnTo, { idToken: response.credential });
          }
        },
        auto_select: false,
        ux_mode: 'popup',
        // Explicitly define scopes to make it clear what permissions are being requested
        scope: 'email profile',
      });
      
      // Render the button
      window.google?.accounts.id.renderButton(
        googleSignInButton,
        { 
          theme: 'outline', 
          size: 'large', 
          width: container.offsetWidth,
          type: 'standard',
          text: 'signin_with',
          logo_alignment: 'left',
        }
      );
    }
  }, [googleButtonRef, returnTo, signInWithProvider]);

  // Initialize Apple Sign-In with explicit consent information
  useEffect(() => {
    if (appleButtonRef.current && window.AppleID) {
      try {
        // Initialize Apple Sign In with explicit scope definitions
        window.AppleID.auth.init({
          clientId: '[CLIENT_ID]', // Replace with your Apple Client ID
          scope: 'name email', // Explicitly define scopes
          redirectURI: window.location.origin + '/auth/callback?redirectTo=' + returnTo,
          state: 'signin',
          usePopup: true
        });
        
        // Add event listener for Apple authentication
        document.addEventListener('AppleIDSignInOnSuccess', (event: any) => {
          // Handle successful authorization
          if (event.detail.authorization && event.detail.authorization.id_token) {
            signInWithProvider('apple', returnTo, { 
              idToken: event.detail.authorization.id_token 
            });
          }
        });
        
        document.addEventListener('AppleIDSignInOnFailure', (event: any) => {
          console.error('Apple Sign In failed:', event.detail.error);
        });
        
        // Create and render the Apple sign-in button
        const appleSignInButton = document.createElement('div');
        appleSignInButton.id = 'appleid-signin';
        appleSignInButton.className = 'w-full';
        appleSignInButton.dataset.color = 'black';
        appleSignInButton.dataset.border = 'true';
        appleSignInButton.dataset.type = 'sign-in';
        
        appleButtonRef.current.innerHTML = '';
        appleButtonRef.current.appendChild(appleSignInButton);
        
        // This will render the Apple button
        window.AppleID?.auth.renderButton({ 
          element: appleSignInButton,
          // Add attributes to display permissions more clearly
          text: 'sign in with apple', 
        });
      } catch (error) {
        console.error('Error initializing Apple Sign In:', error);
      }
    }
  }, [appleButtonRef, returnTo, signInWithProvider]);

  // Add information tooltips about permissions being requested
  const renderPermissionsInfo = () => {
    return (
      <div className="text-xs text-center mb-4 text-muted-foreground">
        <p>By signing in, you'll share your email and profile information with us.</p>
        <p>We only request essential permissions needed for account creation.</p>
      </div>
    );
  };

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    await signIn(values.email, values.password, returnTo);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-card rounded-lg border shadow">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">
          {isFromQuiz 
            ? "Sign in to unlock personalized productivity recommendations" 
            : "Welcome back"}
        </p>
      </div>
      
      {renderPermissionsInfo()}
      
      <div className="flex flex-col gap-4">
        <div ref={googleButtonRef} className="w-full h-10 flex justify-center"></div>
        
        <div ref={appleButtonRef} className="w-full h-10 flex justify-center">
          {/* Apple Sign In button will be rendered here */}
        </div>
        
        {/* Fallback Apple button in case JS API fails */}
        <Button 
          variant="outline" 
          type="button" 
          className="w-full"
          onClick={() => signInWithProvider('apple', returnTo)}
          disabled={isLoading}
        >
          <Icons.apple className="mr-2 h-4 w-4" />
          Continue with Apple
        </Button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="******" 
                      {...field} 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In with Email"}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
