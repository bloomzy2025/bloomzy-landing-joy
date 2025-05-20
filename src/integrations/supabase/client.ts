
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Securely retrieve Supabase configuration
const baseUrl = import.meta.env.VITE_SUPABASE_URL || 
  'https://puzmgethgrcefagylgvt.supabase.co';

// Retrieve the anon key securely
const getKey = () => {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1em1nZXRoZ3JjZWZhZ3lsZ3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjI3MTIsImV4cCI6MjA1NzQ5ODcxMn0._AV6TqLZNp_hXjOe2IeBId_MTxzgomIjxNGNnB2hcgU';
};

// Enhanced configuration with security best practices
const clientOptions = {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Info': 'Web Application',
    },
  },
};

// Create client with secure parameters
export const supabase = createClient<Database>(
  baseUrl,
  getKey(),
  clientOptions
);
