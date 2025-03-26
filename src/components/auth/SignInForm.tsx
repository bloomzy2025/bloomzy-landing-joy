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
import { toast } from "@/hooks/use-toast";
const GOOGLE_CLIENT_ID = '414810963757-5mj2kdpbda0gncbtsc33q7k7a1fph83e.apps.googleusercontent.com';
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});
type SignInFormValues = z.infer<typeof signInSchema>;
type SignInFormProps = {
  returnTo?: string;
};
export default function SignInForm({
  returnTo = '/'
}: SignInFormProps) {
  const {
    signIn,
    signInWithProvider,
    isLoading
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [isFromQuiz, setIsFromQuiz] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [googleError, setGoogleError] = useState<string | null>(null);
  useEffect(() => {
    if (returnTo.includes('/maker-manager-quiz') || location.search.includes('returnTo=/maker-manager-quiz')) {
      setIsFromQuiz(true);
    }
  }, [returnTo, location.search]);
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
        googleSignInButton.dataset.text = 'sign_in_with';
        googleSignInButton.dataset.shape = 'rectangular';
        googleSignInButton.dataset.logo_alignment = 'left';
        googleSignInButton.dataset.width = '100%';
        container.appendChild(googleSignInButton);
        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async response => {
            if (response.credential) {
              await signInWithProvider('google', returnTo, {
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
          text: 'signin_with',
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
  }, [googleButtonRef, returnTo, signInWithProvider]);
  const renderPermissionsInfo = () => {
    return <div className="text-xs text-center mb-4 text-muted-foreground">
        <p>By signing in, you'll share your email and profile information with us.</p>
        <p>We only request essential permissions needed for account creation.</p>
      </div>;
  };
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = async (values: SignInFormValues) => {
    await signIn(values.email, values.password, returnTo);
  };
  return <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-card rounded-lg border shadow">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Log in to Bloomzy</h1>
        <p className="text-muted-foreground">
          {isFromQuiz ? "Sign in to unlock free personalized productivity recommendations" : ""}
        </p>
      </div>
      
      {renderPermissionsInfo()}
      
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
          <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="email" render={({
          field
        }) => <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <FormField control={form.control} name="password" render={({
          field
        }) => <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="******" {...field} />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>} />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In with Email"}
          </Button>
        </form>
      </Form>
      
      
    </div>;
}