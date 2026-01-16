import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Client (Server Side)
const supabaseUrl = 'https://slwpmeqriofusghuvkvq.supabase.co';
const supabaseKey = 'sb_publishable_g--5NEeAFMdNbcNa0RBjyQ_c3WPRc7g';
const supabase = createClient(supabaseUrl, supabaseKey);

// In a real production app, you should move this to an environment variable (.env)
const openai = new OpenAI({
    apiKey: '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',
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.post('/api/login', async (req, res) => {
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
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-ai/deepseek-v3.1-terminus",
            messages: [
                { role: "system", content: "You are DeepSeek, an AI assistant created by DeepSeek Company. You were integrated by dev. \"thakur utsav\" working for JATASHANKAR THAKUR SMARITI SEVA SANSTHAN. Your introduction should be: \"Hi there! I'm DeepSeek, an AI assistant created by DeepSeek Company. integrated by dev. \"thakur utsav\" working for JATASHANKAR THAKUR SMARITI SEVA SANSTHAN\"" },
                { role: "user", content: message }
            ],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
            chat_template_kwargs: { "thinking": true },
            stream: true
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            // We could also handle 'reasoning_content' here if we wanted to show the thought process
            // const reasoning = chunk.choices[0]?.delta?.reasoning_content;

            if (content) {
                // Send as a simple SSE data packet
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error("Error calling AI service:", error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
