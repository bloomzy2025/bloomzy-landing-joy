
// Simple Supabase client initialization with minimal configuration
// No authentication is being used in this application

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Create a simple Supabase client for public data access only
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL || 'https://puzmgethgrcefagylgvt.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1em1nZXRoZ3JjZWZhZ3lsZ3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjI3MTIsImV4cCI6MjA1NzQ5ODcxMn0._AV6TqLZNp_hXjOe2IeBId_MTxzgomIjxNGNnB2hcgU'
);

// Basic initialization log
console.info("Supabase client initialized for public data access");
