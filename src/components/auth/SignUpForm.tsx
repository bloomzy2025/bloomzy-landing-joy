
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Google OAuth client ID 
const GOOGLE_CLIENT_ID = '414810963757-5mj2kdpbda0gncbtsc33q7k7a1fph83e.apps.googleusercontent.com';

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { signUp, signInWithProvider, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [googleError, setGoogleError] = useState<string | null>(null);
  
  // Add information tooltips about permissions being requested
  const renderPermissionsInfo = () => {
    return (
      <div className="text-xs text-center mb-4 text-muted-foreground">
        <p>By signing up, you'll share your email and profile information with us.</p>
        <p>We only request essential permissions needed for account creation.</p>
      </div>
    );
  };
  
  // Initialize Google Sign In for the signup form
  useEffect(() => {
    if (googleButtonRef.current && window.google) {
      try {
        const container = googleButtonRef.current;
        container.innerHTML = '';
        const googleSignInButton = document.createElement('div');
        googleSignInButton.className = 'g_id_signin';
        googleSignInButton.dataset.type = 'standard';
        googleSignInButton.dataset.size = 'large';
        googleSignInButton.dataset.theme = 'outline';
        googleSignInButton.dataset.text = 'sign_up_with';
        googleSignInButton.dataset.shape = 'rectangular';
        googleSignInButton.dataset.logo_alignment = 'left';
        googleSignInButton.dataset.width = '100%';
        container.appendChild(googleSignInButton);
        
        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async response => {
            if (response.credential) {
              await signInWithProvider('google', '/', {
                idToken: response.credential
              });
            }
          },
          auto_select: false,
          ux_mode: 'popup',
          scope: 'email profile'
        });
        
        window.google?.accounts.id.renderButton(googleSignInButton, {
          theme: 'outline',
          size: 'large',
          width: container.offsetWidth,
          type: 'standard',
          text: 'signup_with',
          logo_alignment: 'left'
        });
      } catch (error) {
        console.error('Error initializing Google Sign In:', error);
        setGoogleError('Error initializing Google Sign In. Please try the email option.');
      }
    } else if (!window.google) {
      console.warn('Google Identity Services not loaded');
      setGoogleError('Google Sign In unavailable. Please try the email option.');
    }
  }, [googleButtonRef, signInWithProvider]);
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    await signUp(values.email, values.password, values.fullName);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-card rounded-lg border shadow">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground">Create a new account</p>
      </div>
      
      {renderPermissionsInfo()}
      
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <AlertDescription className="text-sm flex items-start gap-2">
          <Info size={16} className="mt-0.5 flex-shrink-0 text-blue-500" />
          <span>We check if passwords have been exposed in data breaches to keep your account secure.</span>
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col gap-4">
        <div className="w-full">
          {googleError ? <div className="text-red-500 text-xs mb-2">{googleError}</div> : null}
          <div ref={googleButtonRef} className="w-full h-10 flex justify-center"></div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or continue with</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5" type="button">
                          <Info size={14} className="text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>Create a strong password that:</p>
                        <ul className="list-disc ml-4 mt-1 text-xs">
                          <li>Is at least 8 characters long</li>
                          <li>Contains a mix of uppercase and lowercase letters</li>
                          <li>Includes numbers and special characters</li>
                          <li>Hasn't been exposed in data breaches</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
