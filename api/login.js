import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Server Side)
const supabaseUrl = 'https://slwpmeqriofusghuvkvq.supabase.co';
const supabaseKey = 'sb_publishable_g--5NEeAFMdNbcNa0RBjyQ_c3WPRc7g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
