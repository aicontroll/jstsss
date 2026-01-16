import { createClient } from '@supabase/supabase-js';

// User requested simple setup, so we are hardcoding keys.
// The "anon" key is safe to be exposed on the client side with RLS enabled.

const supabaseUrl = 'https://slwpmeqriofusghuvkvq.supabase.co';
const supabaseKey = 'sb_publishable_g--5NEeAFMdNbcNa0RBjyQ_c3WPRc7g';

export const supabase = createClient(supabaseUrl, supabaseKey);
