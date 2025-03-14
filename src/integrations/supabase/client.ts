
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://puzmgethgrcefagylgvt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1em1nZXRoZ3JjZWZhZ3lsZ3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjI3MTIsImV4cCI6MjA1NzQ5ODcxMn0._AV6TqLZNp_hXjOe2IeBId_MTxzgomIjxNGNnB2hcgU';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
