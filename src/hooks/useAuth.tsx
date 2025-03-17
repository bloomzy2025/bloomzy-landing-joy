import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, Provider } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from './use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string, redirectTo?: string) => Promise<void>;
  signInWithProvider: (provider: Provider, redirectTo?: string, options?: any) => Promise<void>;
  signOut: () => Promise<void>;
  connectionError: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (error.message.includes('network') || error.message.includes('fetch')) {
            setConnectionError(true);
          }
          setIsLoading(false);
          return;
        }

        setSession(data.session);
        setUser(data.session?.user || null);
        setConnectionError(false);
      } catch (err) {
        console.error('Fatal error getting session:', err);
        setConnectionError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setIsLoading(false);
          setConnectionError(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('Error setting up auth state change listener:', err);
      setConnectionError(true);
      setIsLoading(false);
      return () => {};
    }
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Account created",
        description: "Please check your email for a confirmation link."
      });
      
      navigate('/signin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string, redirectTo = '/') => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
      
      navigate(redirectTo);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: Provider, redirectTo = '/', options?: any) => {
    try {
      setIsLoading(true);
      
      if (provider === 'google' && options?.idToken) {
        try {
          console.log('Signing in with Google ID token');
          const { error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: options.idToken,
          });

          if (error) {
            console.error('Google sign in error:', error);
            throw error;
          }
          
          toast({
            title: "Welcome!",
            description: "You have successfully signed in with Google."
          });
          
          navigate(redirectTo);
          return;
        } catch (tokenError: any) {
          console.error('Google ID token error:', tokenError);
          toast({
            title: "Google Sign In Failed",
            description: tokenError.message || "Could not authenticate with Google. Please try another method.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
      }
      
      console.log(`Initiating OAuth flow for ${provider}`);
      
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      
      callbackUrl.searchParams.append('redirectTo', redirectTo);
      
      console.log(`Using callback URL: ${callbackUrl.toString()}`);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl.toString(),
          scopes: 'email profile',
        },
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
        throw error;
      }
      
    } catch (error: any) {
      console.error('Provider sign in error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || `Could not sign in with ${provider}. Please try another method.`,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully."
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signInWithProvider,
        signOut,
        connectionError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
