
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { signUp, signInWithProvider, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  // Add information tooltips about permissions being requested
  const renderPermissionsInfo = () => {
    return (
      <div className="text-xs text-center mb-4 text-muted-foreground">
        <p>By signing up, you'll share your email and profile information with us.</p>
        <p>We only request essential permissions needed for account creation.</p>
      </div>
    );
  };
  
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

  // Google sign in handler
  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign in from sign up page');
      await signInWithProvider('google');
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "Sign In Failed",
        description: "Could not sign in with Google. Please try again or use email.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-card rounded-lg border shadow">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground">Create a new account</p>
      </div>
      
      {renderPermissionsInfo()}
      
      <Button 
        variant="outline" 
        type="button" 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Icons.google className="h-5 w-5" />
        <span>Sign up with Google</span>
      </Button>
      
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
