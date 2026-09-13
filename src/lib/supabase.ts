import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project credentials.
const supabaseUrl = 'https://wohnmkkwpjhvsoekerdo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaG5ta2t3cGpodnNvZWtlcmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTU4MDUsImV4cCI6MjEwNDg3MTgwNX0.SL3ciJtt9jrAAltF-vBwN4ZhAZhUTTQdTRQuaifGEew';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents errors in React Native
  },
});
