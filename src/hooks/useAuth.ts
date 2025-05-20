
// This is a simplified placeholder that returns a null user and empty functions
// No authentication is being used in this application

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
