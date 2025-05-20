
// This is a placeholder for the removed authentication functionality
// It returns a null user and empty functions to prevent errors in components
// that still reference the auth hook

export const useAuth = () => {
  return {
    user: null,
    loading: false,
    error: null,
    signIn: () => Promise.resolve({ error: null }),
    signUp: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null }),
    resetPassword: () => Promise.resolve({ error: null }),
  };
};
